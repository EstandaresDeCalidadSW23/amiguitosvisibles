import React, { useEffect, useState } from "react";
import styles from "./../styles/HowTo.module.css";

const HowTo = (props) => {
  const [searchField, setSearchField] = useState("");




  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleRefugioOnly = (info) => {
    props.setClickData(info)
    props.setAmiguito(true)
  }


  console.log(props.listAdoptar)

  return (
    <div className={props.support ? styles.howtosupport : styles.howto}>
      <div className={styles.title}>Adoptar</div>
      {/* <div className={styles.input}>
        <img src="search.svg" className={styles.search} />
        {searchField.length > 0 && (
          <img
            src="searchclear.svg"
            onClick={() => setSearchField("")}
            className={styles.clear}
          />
        )}
        <input
          placeholder="Search for an item"
          value={searchField}
          onChange={handleChange}
        />
      </div> */}
      <div className={props.support ? styles.resultssupport : styles.results}>
        {
          props.listAdoptar.length > 0 ? (
            props.listAdoptar.map((item, i) => (<p
              onClick={() => handleRefugioOnly(item)}
              className={styles.result}
              key={i}
            >
              <div
                className={styles.image}
                style={{ backgroundImage: "url(" + item.image + ")" }}
              ></div>
              <div className={styles.info}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.desc}>{item.description}</div>
              </div>
            </p>))
          ) : null
        }
      </div>
    </div>
  );
};

export default HowTo;
