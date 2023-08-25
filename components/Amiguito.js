import React from "react";
import styles from "./../styles/Amiguito.module.css";
import TimeLine from "./TimeLine";

const Amiguito = (props) => {
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
      <div className={styles.title}>{props.clickData?.name}</div>
      <div className={styles.imageContainer}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${props.clickData?.image})` }}
        ></div>
      </div>
      <div className={styles.title4}>Todal de dinero donano por la comunidad ❤️</div>
      <div className={styles.title4}>Todal de dinero donano por la comunidad ❤️</div>
      <div className={styles.title4}>{props.clickData?.description}</div>

      <div className={styles.containerButton}>
        <div onClick={handleDonar} className={styles.title3}>Contactar</div>
      </div>
      <div className={styles.button} onClick={() => handleContinue()}>Regresar</div>
    </div>
  )
}

export default Amiguito;