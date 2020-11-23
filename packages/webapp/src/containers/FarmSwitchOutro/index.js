import Floater from "react-floater";
import React from "react";
import FarmSwitchOutro from "../../components/FarmSwitchOutro";

export default function FarmSwitchOutroFloater({children, onFinish}) {
  const onFinishClick = () => {
  }
  const Wrapper = (
    <FarmSwitchOutro onFinish={onFinishClick}/>
  )
  return (
    <Floater hideArrow styles={{overlayColor: "rgba(30, 30, 48, 1)"}} component={Wrapper} placement={'center'} onFinish={onFinish}>
      {children}
    </Floater>
  )
}
