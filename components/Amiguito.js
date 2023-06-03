import React, { useMemo, useState } from "react";
import styles from "./../styles/RefugiosOnly.module.css";

const Amiguito = (props) => {
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("");
  const [temperament, setTemperament] = useState("");
  const [searchField, setSearchField] = useState("");

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };


  const handleContinue = () => {
    props.setAmiguito(false)
  }

  const handleDonar = () => {
  }

  return (
    <div className={styles.regionselect}>
      <div className={styles.title}>Juntando</div>
      <div className={styles.title2}>$23.23</div>
      <div className={styles.title4}>Todal de dinero donano por la comunidad ❤️</div>
      <div className={styles.containerButton}>
        <div onClick={handleDonar} className={styles.title3}>Donar</div>
      </div>
      <div className={styles.button} onClick={() => handleContinue()}>Regresar</div>
    </div>
  )
}

export default Amiguito;