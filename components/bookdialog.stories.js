import BookDialog from './bookdialog';

export default {
  title: 'ChatGPT/BookDialog',
  component: BookDialog,
  tags: ['autodocs'],
  argTypes: {
    onConfirm: { action: 'confirm' },
    onClose: { action: 'close' },
  },
};

export const Primary = {};

