import styles from "./styles.scss";
import OutroImg from "../../assets/images/outro/outro.svg";
import Footer from "../Footer";
import Button from "../Form/Button";
import React, {Modal} from "react";

export default function PureFarmSwitchOutroSplash() {
  return (
    // <div className={styles.container}>
    // <Modal>
    <div className={styles.home}>
      <div className={styles.lander}>
        <div className={styles.greetContainer}>
        <div className={styles.title}>
            <h3>{`Switching Farms`}</h3>
          </div>
          <img src={OutroImg}/>
          <div className={styles.description}>
            <h3>The barn door is secure. Heading to <b>Garden of Eden</b>.</h3>
          </div>
        </div>
        <Footer
          children={<>

            <Button fullLength children="Let's go!"/>
          </>}
        >
        </Footer>
      </div>
    </div>
    // </Modal>
    // </div>
  )
}
