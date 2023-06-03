import React from "react";
import styles from "./../styles/Desktop.module.css";
import Splash from "./Splash";

const Desktop = (props) => {
  return (
    <div className={styles.desktop}>
      {props.check && (
        <Splash
          region={props.region}
          pred={props.pred}
          setPred={props.setPred}
          tensor={props.tensor}
          setTensor={props.setTensor}
          setNum={props.setNum}
          num={props.num}
          onboarding={props.onboarding}
          setRegion={props.setRegion}
        />
      )}
      <a
        href="https://etherfuse.com/"
        target="_blank"
        className={styles.awards}
      >
        <img className={styles.award1} src="./etherfuse.13c66e5d.png" />
        {/* <img className={styles.award2} src="./superteamlogo.05a32bce.png" /> */}
      </a>
      <div className={styles.badge}>
        <img className={styles.image} src="logo-with-back.png" />
        <div className={styles.badgewrap}>
          <div className={styles.name}>Amiguitos Visibles</div>
          <div className={styles.credit}>
            Made by{" "}
            <a href="https://www.delicias.tecnm.mx/" target="_blank">
              ITD with ❤️
            </a>
          </div>
        </div>
      </div>
      <a
        href="https://twitter.com/intent/tweet?text=Echa%20un%20vistazo%20a%20AmiguitosVisibles.%20Encuentra%20tu%20compa%C3%B1ero%20perfecto%2C%20con%20total%20transparencia%20y%20responsabilidad.%20Puedes%20visitar%20https%3A%2F%2Famiguitosvisibles.vercel.app%2F.%0A%23SolanaHackathon"
        className={styles.share}
        target="_blank"
      >
        <img src="twitter.svg" /> Share
      </a>
      <a
        href="https://github.com/DanielDerma/amiguitosvisibles"
        target="_blank"
        className={styles.github}
      >
        <img src="github.svg" /> Ver en GitHub
      </a>
      <div className={styles.qrcode}>
        <img src="qrcode.png" />
        <span>Escanea para abrir en tu celular</span>
      </div>
    </div>
  );
};

export default Desktop;
