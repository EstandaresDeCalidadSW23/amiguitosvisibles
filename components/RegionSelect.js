import React, { useState } from "react";
import styles from "./../styles/RegionSelect.module.css";

const RegionSelect = (props) => {
	const [option, setOption] = useState(props.region);

	const handleContinue = () => {
		props.handleRegion(option);
	}

	return (
		<div className={styles.regionselect}>
			<div className={styles.title}>Selecciona tu tipo de usuario</div>
			<div className={styles.subtitle}>Esto nos ayudará a ofrecerte una experiencia más personalizada</div>
			<div className={styles.options}>
				<div className={option === 1 ? styles.optioncheck : styles.option} onClick={() => setOption(1)}>
					<div className={styles.info}>
						<img src={option === 1 ? "checked.svg" : "unchecked.svg"} />
						<div className={styles.name}>❤️ Persona</div>
						<div className={styles.desc}>Eres una persona de gran corazón que tiene gran amor por los animales</div>
					</div>
				</div>
				<div className={option === 2 ? styles.optioncheck : styles.option} onClick={() => setOption(2)}>
					<div className={styles.info}>
						<img src={option === 2 ? "checked.svg" : "unchecked.svg"} />
						<div className={styles.name}>⛺ Refugio / Rescatista</div>
						<div className={styles.desc}>Eres un refugio que quiere recibir ayuda para los animales que cuidas</div>
					</div>
				</div>
			</div>
			<div className={option === 0 ? styles.disabled : styles.button} onClick={() => handleContinue()}>Continue</div>
		</div>
	)
}

export default RegionSelect;