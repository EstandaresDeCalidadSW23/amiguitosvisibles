import React, { useEffect, useMemo, useState } from "react";
import styles from "./../styles/ViewerInfoUser.module.css";



const RegionSelect = (props) => {
  const [edad, setEdad] = useState("");
  const [nombre, setNombre] = useState("");
  const [tel, setTel] = useState("+52");
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState({
    likeBigPet: "",
    onDogs: "",
    isIntrovert: "",
  });

  const handleContinue = async () => {
    // props.setUserInfo({
    //   edad,
    //   nombre,
    //   tel,
    //   match: q
    // })
    if (loading) return
    setLoading(true)
    await props.handleCreate({
      edad,
      nombre,
      tel,
      match: q
    })
    setLoading(false)
    props.setViewInfoUser(false)
  }

  const isAllFilled = q.likeBigPet && q.onDogs && q.isIntrovert && edad && nombre;
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
            min={0}
            onChange={(e) => setEdad(e.target.value)}
          />
        </div>
        <div className={styles.title}>Tel:</div>
        <div className={styles.input}>
          <input
            placeholder=""
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
        <div className={styles.title}>Vives en un departamento o casa?</div>
        <div className={styles.input}>
          <select value={q.likeBigPet} onChange={(e) => {
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
          <select value={q.onDogs} onChange={(e) => {
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
          <select value={q.isIntrovert} onChange={(e) => {
            setQ({
              ...q,
              isIntrovert: e.target.value
            })
          }}>
            <option value="">Selecciona una opción</option>
            <option value="caminar">Caminar</option>
            <option value="quedarme">Quedarme en casa</option>
          </select>
        </div>
        <div className={styles.space} />
      </div>
      <div className={!isAllFilled ? styles.disabled : styles.button} onClick={() => handleContinue()}>{!loading ? 'Continuar' : "creado NFT, para que lo presumas con tus amigos...."}</div>
    </div>
  )
}

export default RegionSelect;