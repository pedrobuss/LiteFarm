import styles from './styles.scss';
import Logo from '../../assets/images/signUp/logo.svg';
import LineBreak from '../../assets/images/signUp/lineBreak.svg';
import Button from '../Form/Button';
import Input from '../Form/Input';
import React from 'react';
import Footer from '../Footer';

export default function PureCustomSignUp({ ssoSignUp, onContinue }) {

  return (

    <>
    <div className={styles.home}>
      <div className={styles.lander}>
        <div className={styles.greetContainer}>
          <img src={Logo}/>
          <div className={styles.ssoButton}>
          <Button fullLength children='CONTINUE WITH GOOGLE' color='secondary' onClick={ssoSignUp} />
          </div>
          <div className={styles.lineBreak}>
          <img src={LineBreak}/>
          </div>
          <div className={styles.continueButton}>
          <Input className={styles.manualInputContainer} label='Enter your email' />
          </div>
        </div>

      </div>

    </div>
    <Footer style={{ position: 'sticky', bottom: '0' }}
            children={<>

              <Button fullLength children='Continue' onClick={onContinue}/>
            </>}
    >
    </Footer>
  </>
  )
}
