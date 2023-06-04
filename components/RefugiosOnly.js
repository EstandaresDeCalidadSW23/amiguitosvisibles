import React, { useMemo, useState } from "react";
import styles from "./../styles/RefugiosOnly.module.css";

const Refugios = (props) => {
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("");
  const [temperament, setTemperament] = useState("");
  const [searchField, setSearchField] = useState("");



  const handleChange = (e) => {
    setSearchField(e.target.value);
  };


  const handleContinue = () => {
    props.setRefugiosOnly(false)
  }

  const handleDonate = () => {
    let senderPublicKey = window.localStorage.getItem("publicKey");
    let receiverPublicKey = props.properties.creators[0].address;
    let amount = 0.3;
    donateToInstitution(senderPublicKey, receiverPublicKey, amount);
  };

  return (
    <div className={styles.regionselect}>
      <div className={styles.title}>{props.clickData ? props.clickData : ""}</div>
      <input type="number" min={0} className={styles.title2} placeholder="Cantidad a donar" />
      <div className={styles.containerButton}>
        <div onClick={handleDonate} className={styles.title3}>Donar</div>
      </div>
      <div className={styles.button} onClick={() => handleContinue()}>Regresar</div>
    </div>
  )
}

export default Refugios;