import React, { useEffect, useState } from "react";
import styles from "./../styles/Splash.module.css"
import RegionSelect from "./RegionSelect";
import Onboarding from "./Onboarding";
import Dashboard from "./Dashboard";
import Viewer from "./Viewer";
import Refugios from "./Refugios";
import RefugiosOnly from "./RefugiosOnly";
import Amiguito from "./Amiguito";
import Settings from "./Settings";

const Splash = (props) => {
	const [getStarted, setGetStarted] = useState(false);
	const [done, setDone] = useState(false);
	const [done2, setDone2] = useState(false);
	const [view, setView] = useState(false);
	const [refugios, setRefugios] = useState(false);
	const [refugiosOnly, setRefugiosOnly] = useState(false);
	const [amiguito, setAmiguito] = useState(false);
	const [settings, setSettings] = useState(false);
	const [reset, setReset] = useState(false);
	const [on, setOn] = useState(false);

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

	const handleRegion = (number) => {
		props.setRegion(number);
		localStorage.setItem("region", number);
		setDone(true);
		setReset(false);
	}

	return (
		<div className={styles.container}>
			{view &&
				<Viewer pred={props.pred} setPred={props.setPred} tensor={props.tensor} setTensor={props.setTensor} setView={setView} setNum={props.setNum} num={props.num} region={props.region} />
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
			{settings && !reset && !on &&
				<Settings setSettings={setSettings} setReset={setReset} setOn={setOn} />
			}
			{done && done2 && !view && !refugios && !settings && !refugiosOnly && !amiguito &&
				<Dashboard setSettings={setSettings} setView={setView} setRefugios={setRefugios} setAmiguito={setAmiguito} num={props.num} setNum={props.setnum} region={props.region} />
			}
			{on &&
				<Onboarding setDone={setDone2} setOn={setOn} />
			}
			{getStarted && done && !done2 &&
				<Onboarding setDone={setDone2} setOn={setOn} />
			}
			{reset &&
				<RegionSelect handleRegion={handleRegion} region={props.region} />
			}
			{getStarted && !done2 && !done &&
				<RegionSelect handleRegion={handleRegion} region={props.region} />
			}
			{!getStarted &&
				<div className={styles.splash}>
					<div className={styles.logo}>
						<img src="logo.svg" />
						AmiguitosVisibles
					</div>
					<div className={styles.illustration}>
						<img className={styles.clouds} src="clouds.svg" />
						<img className={styles.trees} src="trees.svg" />
						<img className={styles.person} src="person.svg" />
						<img className={styles.flower} src="flower.svg" />
						<img className={styles.trash} src="trash.svg" />
						<img className={styles.ground} src="ground.svg" />
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