import React, { useMemo, useState } from "react";
import styles from "./../styles/ViewerInfoUser.module.css";



const RegionSelect = (props) => {
  const [edad, setEdad] = useState("");
  const [nombre, setNombre] = useState("");
  const [q, setQ] = useState({
    likeBigPet: "",
    onDogs: "",
    isIntrovert: "",
  });


  const handleContinue = () => {
    props.setViewInfoUser(false)
  }

  const isAllFilled = useMemo(() => q && q2 && q3, [q, q2, q3])
  return (
    <div className={styles.regionselect}>
      <div className={styles.title}>Queremos brindarte la mejor experiencia</div>
      <div className={styles.subtitle}>Rellena los siguientes campos para poder hacer el match perfecto ❤️</div>
      <div className={styles.formContainer}>
        <div className={styles.title}>Nombre:</div>
        <div className={styles.input}>
          <input
            placeholder=""
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className={styles.title}>Edad</div>
        <div className={styles.input}>
          <input
            placeholder=""
            value={edad}
            type="number"
            onChange={(e) => setEdad(e.target.value)}
          />
        </div>
        <div className={styles.title}>Vives en un departamento o casa?</div>
        <div className={styles.input}>
          <select value={q.likeBigPet} onChange={() => {
            setQ({
              ...q,
              likeBigPet: e.target.value
            })
          }}>
            <option value="">Selecciona una opción</option>
            <option value="departamento">Departamento</option>
            <option value="casa">Casa</option>
          </select>
        </div>
        <div className={styles.title}>¿Eres mas de perros o gatos?</div>
        <div className={styles.input}>
          <select value={q.onDogs} onChange={() => {
            setQ({
              ...q,
              onDogs: e.target.value
            })
          }}>
            <option value="">Selecciona una opción</option>
            <option value="perros">Perros</option>
            <option value="gatos">Gatos</option>
          </select>
        </div>
        <div className={styles.title}>¿Te gusta salir a caminar o prefieres quedarte en casa?</div>
        <div className={styles.input}>
          <select>
            <option value="">Selecciona una opción</option>
            <option value="caminar">Caminar</option>
            <option value="quedarme">Quedarme en casa</option>
          </select>
        </div>
        <div className={styles.space} />
      </div>
      <div className={!isAllFilled ? styles.disabled : styles.button} onClick={() => handleContinue()}>Continue</div>
    </div>
  )
}

export default RegionSelect;