import React, { useMemo, useState } from "react";
import styles from "./../styles/Amiguito.module.css";

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
      <div className={styles.title}>Pablo</div>
      <div className={styles.imageContainer}>
        <div
          className={styles.image}
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1635766054474-ebaba5355bd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)" }}
        ></div>
      </div>
      <div className={styles.title4}>Todal de dinero donano por la comunidad ❤️</div>
      <div className={styles.title4}>Todal de dinero donano por la comunidad ❤️</div>
      <div className={styles.title4}>Todal de dinero donano por la comunidad ❤️</div>
      <div className={styles.containerButton}>
        <div onClick={handleDonar} className={styles.title3}>Contactar</div>
      </div>
      <div className={styles.button} onClick={() => handleContinue()}>Regresar</div>
    </div>
  )
}

export default Amiguito;