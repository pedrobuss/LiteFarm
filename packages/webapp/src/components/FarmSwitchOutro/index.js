import styles from "./styles.scss";
import OutroImg from "../../assets/images/farm-switch-outro/outro.svg";
import Footer from "../Footer";
import Button from "../Form/Button";
import React from "react";

export default function FarmSwitchPureOutroSplash({onContinue}) {

  // TODO: Get farm name from store 
  const newFarm = "Garden of Eden.";
  const description = "The barn door is secure. Heading to " + newFarm;

  
  return (
    <div className={styles.outroContainer}>
      <div className={styles.title}>
        {`Switching Farms`}
      </div>
      <div className={styles.imgContainer}>
        <img src={OutroImg}/>
      </div>

      <div className={styles.description}>
        {/* <div className={styles.descriptionFarm} attr="Garden of Eden"> */}
          {description}
        {/* </div> */}
      </div>
      <Footer>
        <Button className={styles.bottomContainer} children="Let's Go!"></Button>
      </Footer>


    </div>
  )
}
