import OutroImg from '../../assets/images/outro/outro.svg';
import React, {Component} from "react";
import styles from "./styles.scss";
import Footer from '../../stories/Footer/index';
import Button from '../../stories/Button/index'

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
                        <img src={OutroImg}/>
                            <div className={styles.description}> 
                                <h3>{`And finally, let us show you a couple of important things!`}</h3>
                            </div>
                        </div>
                    
                        <Footer
                            children={<><Button fullLength color="secondary" children='Go back'/><Button fullLength children='Finish'/></>}
                        >

                       
                        </Footer>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Outro