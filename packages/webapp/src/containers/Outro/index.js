import OutroImg from '../../assets/images/outro/outro.svg';
import React, {Component} from "react";
import styles from "./styles.scss";

class Outro extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.home}> 
                <div className={styles.lander}>
                    <div>
                        <div className={styles.greetContainer}>
                        <img src={OutroImg} alt=""/>
                            <h3>{`And finally, let us show you a couple of important things!`}</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Outro