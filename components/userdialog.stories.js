import UserDialog from './userdialog';

export default {
  title: 'ChatGPT/UserDialog',
  component: UserDialog,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'close' },
    onConfirm: { action: 'confirm' },
  },
};

export const Primary = {
    args: {
        bookId: 'str0001',
        chapterId: 'cha0002',
    },
};

