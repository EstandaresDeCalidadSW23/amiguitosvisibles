import React, { useState } from "react";
import styles from "./../styles/Onboarding.module.css";

const Onboarding = (props) => {
  const [step, setStep] = useState(1);

  const handleStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div className={styles.onboarding}>
      <div
        className={styles.skip}
        onClick={() => {
          props.setDone(true);
          props.setOn(false);
        }}
      >
        Saltar
      </div>
      {step === 1 && (
        <div className={styles.image}>
          <img src="1handright.svg" className={styles.handright} />
          <img src="1handleft.svg" className={styles.handleft} />
        </div>
      )}
      {step === 2 && (
        <div className={styles.image}>
          <img src="2robot.svg" className={styles.robot} />
          <img src="2smoke.svg" className={styles.smoke} />
          <img src="2question.svg" className={styles.question} />
        </div>
      )}
      {step === 3 && (
        <div className={styles.image}>
          <img src="3trash.svg" className={styles.trash} />
          <img src="3trees.svg" className={styles.trees} />
        </div>
      )}
      <div className={styles.bottom}>
        <div className={styles.progress}>
          <div
            onClick={() => setStep(1)}
            className={step === 1 ? styles.active : styles.inactive}
          ></div>
          <div
            onClick={() => setStep(2)}
            className={step === 2 ? styles.active : styles.inactive}
          ></div>
          <div
            onClick={() => setStep(3)}
            className={step === 3 ? styles.active : styles.inactive}
          ></div>
        </div>
        {step === 1 && (
          <div>
            <div className={styles.text}>Transparencia y verificación</div>
            <div className={styles.subtitle}>
              La tecnología blockchain asegura un registro transparente y seguro de perfiles de las mascotas, registros médicos y transacciones de adopción, evitando fraudes y generando confianza en los adoptantes potenciales.
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className={styles.text}>Seguimiento</div>
            <div className={styles.subtitle}>
              El seguimiento completo de las adopciones a lo largo del tiempo se logra gracias a la inmutabilidad de la cadena de bloques. Los adoptantes y los refugios pueden registrar actualizaciones, fotos y detalles sobre el bienestar de los perros adoptados.
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className={styles.text}>
              Responsabilidad
            </div>
            <div className={styles.subtitle}>
              Fomentando así la responsabilidad y la transparencia. Esta comunidad comprometida se preocupa por el cuidado y el bienestar de nuestros amiguitos ❤️.
            </div>
          </div>
        )}
        {step < 3 && (
          <div className={styles.next} onClick={() => handleStep()}>
            <img src="arrow.svg" />
          </div>
        )}
        {step === 3 && (
          <div
            className={styles.button}
            onClick={() => {
              props.setDone(true);
              props.setOn(false);
              props.setViewInfoUser(true);
            }}
          >
            Tomar acción
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
