import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '../../history';
import PureCustomSignUp from '../../components/PureCustomSignUp';
import {manualSignUpSuccess} from "./slice";

function CustomSignUp() {
  const dispatch = useDispatch();

  const ssoSignUp = () => {

  }
  const onContinue = () => {
    dispatch(manualSignUpSuccess())

  }

  return (
    <PureCustomSignUp ssoSignUp={ssoSignUp} onContinue={onContinue}/>
  )

}


export default CustomSignUp;
