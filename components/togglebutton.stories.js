import ToggleButton, { ChatModes } from './togglebutton';

export default {
  title: 'ChatGPT/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'change' },
  },
};

export const Person = {
    args: {
      mode: ChatModes.Person
    },
};

export const Group = {
  args: {
    mode: ChatModes.Group
  },
};
