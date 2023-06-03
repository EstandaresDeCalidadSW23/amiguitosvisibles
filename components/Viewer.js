import React, { useMemo, useState } from "react";
import styles from "./../styles/Viewer.module.css";

const RegionSelect = (props) => {
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("");
  const [temperament, setTemperament] = useState("");


	const handleContinue = () => {
		props.setView(false)
	}

  const isAllFilled = useMemo(() => animal && breed && size && temperament, [animal, breed, size, temperament])
	return (
		<div className={styles.regionselect}>
			<div className={styles.title}>Registra a la mascota</div>
			<div className={styles.subtitle}>Esto nos ayudará a ofrecerte la mejor experiencia a tu mascota.</div>
			<div className={styles.formContainer}>
			<div className={styles.title}>Que animal es tu mascota?</div>
      <div className={styles.input}>        
        <input
          placeholder="Perro, Gato, Conejo, etc..."
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
        />
      </div>			
			<div className={styles.title}>Que raza es tu mascota?</div>
      <div className={styles.input}>        
        <input
          placeholder="Pug, Labrador, etc..."
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </div>			
			<div className={styles.title}>Que tamaño tiene tu mascota?</div>
      <div className={styles.input}>        
        <input
          placeholder="Pequeño, Mediano, Grande, etc..."
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>												
			<div className={styles.title}>Que temperamento tiene tu mascota?</div>
      <div className={styles.input}>        
        <input
          placeholder="Jugueton, Tranquilo, etc..."
          value={temperament}
          onChange={(e) => setTemperament(e.target.value)}
        />
      </div>	
			
			</div>					
			<div className={!isAllFilled ? styles.disabled : styles.button} onClick={() => handleContinue()}>Continue</div>
		</div>
	)
}

export default RegionSelect;