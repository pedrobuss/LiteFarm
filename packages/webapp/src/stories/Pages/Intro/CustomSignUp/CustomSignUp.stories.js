import React from 'react';
import PureCustomSignUp from '../../../../components/CustomSignUp';
export default {
  title: 'Form/Intro/7-CustomSignUp',
  component: PureCustomSignUp,
};

const Template = (args) => <PureCustomSignUp {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  redirectFinish: () => {}
};
Primary.parameters = {
  chromatic: { viewports: [320, 414, 768, 1024, 1800] },
};