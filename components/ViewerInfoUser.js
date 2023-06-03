import React, { useMemo, useState } from "react";
import styles from "./../styles/ViewerInfoUser.module.css";

const RegionSelect = (props) => {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");


  const handleContinue = () => {
    props.setViewInfoUser(false)
  }

  const isAllFilled = useMemo(() => q1 && q2 && q3, [q1, q2, q3])
  return (
    <div className={styles.regionselect}>
      <div className={styles.title}>Queremos brindarte la mejor experiencia</div>
      <div className={styles.subtitle}>Rellena los siguientes campos para poder brindarte la mejor experiencia.</div>
      <div className={styles.formContainer}>
        <div className={styles.title}>Si pudieras ser un animal salvaje por un día, ¿cuál elegirías y por qué te identificas con él?</div>
        <div className={styles.input}>
          <input
            placeholder=""
            value={q1}
            onChange={(e) => setQ1(e.target.value)}
          />
        </div>
        <div className={styles.title}>¿Qué características buscarías en ese animal para que se convierta en tu compañero de aventuras perfecto?</div>
        <div className={styles.input}>
          <input
            placeholder=""
            value={q2}
            onChange={(e) => setQ2(e.target.value)}
          />
        </div>
        <div className={styles.title}>¿Cuál es tu entorno natural favorito para disfrutar con tu mascota: una playa soleada, una montaña cubierta de nieve o un tranquilo bosque con senderos para explorar?</div>
        <div className={styles.input}>
          <input
            placeholder=""
            value={q3}
            onChange={(e) => setQ3(e.target.value)}
          />
        </div>
      </div>
      <div className={!isAllFilled ? styles.disabled : styles.button} onClick={() => handleContinue()}>Continue</div>
    </div>
  )
}

export default RegionSelect;