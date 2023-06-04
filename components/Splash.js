import React, { useEffect, useState } from "react";
import styles from "./../styles/Splash.module.css"
import { getMarketNFT } from "./../api/GetNTF";
import RegionSelect from "./RegionSelect";
import Onboarding from "./Onboarding";
import Dashboard from "./Dashboard";
import Viewer from "./Viewer";
import Refugios from "./Refugios";
import RefugiosOnly from "./RefugiosOnly";
import Amiguito from "./Amiguito";
import AmiguitoForSell from "./AmiguitoForSell";
import Settings from "./Settings";
import ViewerInfoUser from "./ViewerInfoUser";



const Splash = (props) => {
	const [getStarted, setGetStarted] = useState(false);
	const [done, setDone] = useState(false);
	const [done2, setDone2] = useState(false);
	const [view, setView] = useState(false);
	const [viewInfoUser, setViewInfoUser] = useState(false);
	const [refugios, setRefugios] = useState(false);
	const [refugiosOnly, setRefugiosOnly] = useState(false);
	const [amiguito, setAmiguito] = useState(false);
	const [amiguitoForSell, setAmiguitoForSell] = useState(false);

	const [settings, setSettings] = useState(false);
	const [reset, setReset] = useState(false);
	const [on, setOn] = useState(false);

	// data
	const [listDandoAdopcion, setListDandoAdopcion] = useState(null);
	const [listAdoptar, setListAdoptar] = useState(null);
	const [listRefugios, setListRefugios] = useState(null);

	useEffect(() => {
		if (props.region > 0) {
			setDone(true);
			setGetStarted(true);
		}
	}, [props.region]);

	useEffect(() => {
		if (props.onboarding) {
			setDone2(true);
		}
	}, [props.onboarding]);

	useEffect(() => {
		if (done2) {
			localStorage.setItem("onboarding", true);
			setOn(false);
		}
	}, [done2]);

	useEffect(() => {
		if (!(done && done2 && !view && !refugios && !settings && !refugiosOnly && !amiguito && !amiguitoForSell && !viewInfoUser)) return;
		getMarketNFT().then(async (e) => {
			if (e.success) {
				const data = await Promise.all(e.result.map(async (e) => {
					const res = await fetch(e.nft.metadata_uri);
					const json = await res.json();
					return json
				}))
				console.log(data)
				const pets = data.filter(e => e.attributes.user_type === "pet")
				const myPets = pets.filter(e => e.properties.creators[0].address === "nNXggn4P96GcuBsMjmyqe9FJWEPqUS641CaBJYXyTLx")
				const otherPets = pets.filter(e => e.properties.creators[0].address !== "nNXggn4P96GcuBsMjmyqe9FJWEPqUS641CaBJYXyTLx")
				setListDandoAdopcion(myPets)
				setListAdoptar(otherPets)
				setListRefugios(data.filter(e => e.attributes.user_type === "refugio"))
			}
		})
	}, [done, done2, view, refugios, settings, refugiosOnly, amiguito, amiguitoForSell, viewInfoUser])

	const handleRegion = (number) => {
		props.setRegion(number);
		localStorage.setItem("region", number);
		setDone(true);
		setReset(false);
	}

	console.log(listDandoAdopcion,
		listAdoptar,
		listRefugios)

	return (
		<div className={styles.container}>
			{view &&
				<Viewer pred={props.pred} setPred={props.setPred} tensor={props.tensor} setTensor={props.setTensor} setView={setView} setNum={props.setNum} num={props.num} region={props.region} />
			}
			{
				viewInfoUser &&
				<ViewerInfoUser pred={props.pred} setPred={props.setPred} tensor={props.tensor} setTensor={props.setTensor} setViewInfoUser={setViewInfoUser} setNum={props.setNum} num={props.num} region={props.region} setUserInfo={props.setUserInfo} handleCreate={props.handleCreate} />
			}
			{refugios &&
				<Refugios pred={props.pred} setPred={props.setPred} setRefugios={setRefugios} setRefugiosOnly={setRefugiosOnly} tensor={props.tensor} setTensor={props.setTensor} setView={setView} setNum={props.setNum} num={props.num} region={props.region} />
			}
			{refugiosOnly &&
				<RefugiosOnly pred={props.pred} setPred={props.setPred} tensor={props.tensor} setTensor={props.setTensor} setRefugiosOnly={setRefugiosOnly} setRefugios={setRefugios} setNum={props.setNum} num={props.num} region={props.region} />
			}
			{
				amiguito &&
				<Amiguito pred={props.pred} setPred={props.setPred} tensor={props.tensor} setTensor={props.setTensor} setAmiguito={setAmiguito} setRefugiosOnly={setRefugiosOnly} setRefugios={setRefugios} setNum={props.setNum} num={props.num} region={props.region} />
			}
			{
				amiguitoForSell &&
				<AmiguitoForSell setAmiguitoForSell={setAmiguitoForSell} pred={props.pred} setPred={props.setPred} tensor={props.tensor} setTensor={props.setTensor} setAmiguito={setAmiguito} setRefugiosOnly={setRefugiosOnly} setRefugios={setRefugios} num={props.num} region={props.region} />
			}
			{settings && !reset && !on &&
				<Settings setSettings={setSettings} setReset={setReset} setOn={setOn} />
			}
			{done && done2 && !view && !refugios && !settings && !refugiosOnly && !amiguito && !amiguitoForSell && !viewInfoUser &&
				<Dashboard setSettings={setSettings} setView={setView} setRefugios={setRefugios} setAmiguito={setAmiguito} setAmiguitoForSell={setAmiguitoForSell} num={props.num} setNum={props.setnum} region={props.region} />
			}
			{on &&
				<Onboarding setDone={setDone2} setOn={setOn} setViewInfoUser={setViewInfoUser} />
			}
			{getStarted && done && !done2 &&
				<Onboarding setDone={setDone2} setOn={setOn} setViewInfoUser={setViewInfoUser} />
			}
			{reset &&
				<RegionSelect handleRegion={handleRegion} region={props.region} setUserType={props.setUserType} />
			}
			{getStarted && !done2 && !done &&
				<RegionSelect handleRegion={handleRegion} region={props.region} setUserType={props.setUserType} />
			}
			{!getStarted &&
				<div className={styles.splash}>
					<div className={styles.logo}>
						<img src="icon.png" />
						AmiguitosVisibles
					</div>
					<div className={styles.illustration}>
						<img className={styles.clouds2} src="images/taxi-quality-time-with-a-dog.png" />
					</div>
					<div className={styles.title}>Encuentra tu compañero perfecto, con total transparencia y responsabilidad.</div>
					<div className={styles.subtitle}>Uniendo lazos perfectos entre mascotas y adoptantes, encontrando la combinación ideal en cada latido de corazón.</div>
					<div className={styles.button} onClick={() => setGetStarted(true)}>Comenzar</div>
					<a className={styles.about} href="https://github.com/DanielDerma/amiguitosvisibles" target="_blank">Acerca de</a>
				</div>
			}
		</div>
	)
}

export default Splash;