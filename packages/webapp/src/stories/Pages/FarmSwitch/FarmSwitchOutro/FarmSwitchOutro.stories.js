import React from 'react';
import FarmSwitchPureOutroSplash from '../../../../components/FarmSwitchOutro';
import decorators from '../../config/decorators';

export default {
  title: 'Form/FarmSwitch/1-FarmSwitchOutro',
  // decorators: decorators,
  component: FarmSwitchPureOutroSplash,
};

const Template = (args) => <FarmSwitchPureOutroSplash {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  redirectFinish: () => {}
};
