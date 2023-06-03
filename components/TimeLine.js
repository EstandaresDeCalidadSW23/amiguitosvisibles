import React, { useMemo, useState } from "react";
import styles from "./../styles/TimeLine.module.css";

// estructura
// json => title, descripcion, link, fecha

const TimeLine = (props) => {
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
      {[1, 2, 3, 5, 6, 0, 7].map((e) => (
        <div>
          <div>{e}. Visita al medico</div>
          <div>23/23/23</div>
          <div>descripcion ... .. . .. . </div>
          <div>mas informacion</div>


        </div>
      ))}
    </div>
  )
}

export default TimeLine;