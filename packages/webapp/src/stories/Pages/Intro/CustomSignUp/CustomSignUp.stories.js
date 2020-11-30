import React from 'react';
import PureCustomSignUp from '../../../../components/CustomSignUp';
import decorators from '../../config/decorators';

export default {
  title: 'Form/Intro/7-CustomSignUp',
  component: PureCustomSignUp,
  // decorators: decorators,
};

const Template = (args) => <PureCustomSignUp {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  redirectFinish: () => {}
};
Primary.parameters = {
  chromatic: { viewports: [320, 414, 768, 1024, 1800] },
};