import React, { useEffect, useState } from "react";
import styles from "./../styles/Dashboard.module.css";
import HowTo from "./HowTo";

const Dashboard = (props) => {
  const [support, setSupport] = useState(true);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          url: "https://amiguitosvisibles.vercel.app/",
          text: "Encuentra tu compañero perfecto, con total transparencia y responsabilidad.",
          title: "AmiguitosVisibles",
        })
        .then(function () {
          console.log("Successful share");
        })
        .catch(function (error) {
          window.open(
            "https://twitter.com/intent/tweet?text=Echa%20un%20vistazo%20a%20AmiguitosVisibles.%20Encuentra%20tu%20compa%C3%B1ero%20perfecto%2C%20con%20total%20transparencia%20y%20responsabilidad.%20Puedes%20visitar%20https%3A%2F%2Famiguitosvisibles.vercel.app%2F.%0A%23SolanaHackathon",
            "_blank"
          );
        });
    } else {
      window.open(
        "https://twitter.com/intent/tweet?text=Echa%20un%20vistazo%20a%20AmiguitosVisibles.%20Encuentra%20tu%20compa%C3%B1ero%20perfecto%2C%20con%20total%20transparencia%20y%20responsabilidad.%20Puedes%20visitar%20https%3A%2F%2Famiguitosvisibles.vercel.app%2F.%0A%23SolanaHackathon",
        "_blank"
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("support") != null) {
        setSupport(false);
      }
    }
  }, []);

  const handleSupport = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    setSupport(false);
    localStorage.setItem("support", false);
  };

  return (
    <div className={styles.dashboard}>
      {support && (
        <a
          href="https://hackathon.etherfuse.com/tracks/shyft"
          target="_blank"
          className={styles.support}
          onClick={() => {
            setSupport(false);
            localStorage.setItem("support", false);
          }}
        >
          <img
            src="closesupport.svg"
            className={styles.closesupport}
            onClick={handleSupport}
          />
          <img src="support.svg" className={styles.supportimg} />
          <div className={styles.supportinfo}>
            <div className={styles.supporttitle}>Solana Hackathon GDL</div>
            <div className={styles.supportdesc}>
              ¡Vamos a por ese premio! #SolanaHackathon #SHYFT
            </div>
          </div>
        </a>
      )}
      <div className={styles.nav}>
        <div className={styles.header}>Amiguitos</div>
        {/* <div className={styles.headerWallet}>Dxcxcxc..</div> */}
        <div className={styles.right}>
          <img
            src="settings.svg"
            onClick={() => props.setSettings(true)}
            className={styles.settings}
          />
          <img
            onClick={() => handleShare()}
            className={styles.help}
            src="share.svg"
          />
        </div>
      </div>
      {props.num > 0 ? (
        <div className={styles.callout} onClick={() => props.setView(true)}>
          <img src="decoration.svg" />
          <div className={styles.pretitle}>You recycled</div>
          <div className={styles.title}>
            {props.num} plastic item{props.num > 1 && "s"}
          </div>
        </div>
      ) : (
        <div className={styles.callout} onClick={() => props.setView(true)}>
          <img src="decoration.svg" />
          <div className={styles.pretitle}>Dar en adopcion</div>
          <div className={styles.title}>De manera responsable</div>
        </div>
      )}
      <HowTo support={support} setAmiguito={props.setAmiguito} />
      <div className={styles.button} onClick={() => props.setRefugios(true)}>
        Donar a un refugio. ❤️
      </div>
    </div>
  );
};

export default Dashboard;
