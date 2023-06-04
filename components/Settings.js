import React from "react";
import styles from "./../styles/Settings.module.css";
import { useRouter } from "next/router";

const Settings = (props) => {
	const router = useRouter();
	const signOut = async () => {
		if (window) {
			const { solana } = window;
			window.localStorage.removeItem("publicKey");
			window.localStorage.removeItem("region");
			window.localStorage.removeItem("onboarding");

			solana.disconnect();
			router.reload('/');
			// empy all localstorage

		}
	};
	return (
		<div className={styles.settings}>
			<div className={styles.nav}>
				<img src="arrow-back.svg" onClick={() => props.setSettings(false)} />
				<span className={styles.header}>Settings</span>
			</div>
			<div className={styles.all}>
				{/* <div className={styles.item} onClick={() => props.setReset(true)}><span>Update region</span> <img src="enter.svg"/></div>
				<div className={styles.item} onClick={() => props.setOn(true)}><span>View onboarding</span> <img src="enter.svg"/></div> */}
				{/* <div className={styles.space}></div> */}
				<a href="https://hackathon.etherfuse.com/" target="_blank" className={styles.item}><span>Información de la Hackathon</span> <img src="enter.svg" /></a>
				<div className={styles.space}></div>
				<a onClick={signOut} target="_blank" className={styles.item}><span>Desconecta tu wallet 👻</span> <img src="enter.svg" /></a>
				<div className={styles.credit}>Made by{" "}
					<a href="https://www.delicias.tecnm.mx/" target="_blank">
						ITD with ❤️
					</a></div>
			</div>
		</div>
	)
}

export default Settings;