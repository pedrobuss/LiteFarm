import React  from "react";
import { connect } from 'react-redux';
import history from '../../history';
import PureSwitchOutroSplash from "../../components/SwitchFarmOutro";

function OutroSwitch({ farm, dispatch }) {

  const redirectFinish = () => {
    dispatch(finishOnboarding())
    history.push('/home')
  }

  const onGoBack = () => {

  }


  return (
    <PureSwitchOutroSplash />
  )

}

const mapStateToProps = (state) => {
  return {
    farm: state.baseReducer.farm,
  }
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(OutroSwitch);
