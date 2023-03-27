import SceneDialog, { DialogModes } from './scenedialog';

export default {
  title: 'ChatGPT/SceneDialog',
  component: SceneDialog,
  tags: ['autodocs'],
  argTypes: {
    onConfirm: { action: 'confirm' },
    onClose: { action: 'close' },
  },
};

export const Primary = {
  args: {
    mode: DialogModes.Save,
    bookId: 'str0001',
    chapterId: 'cha0001',
  },
};

export const Add = {
  args: {
    mode: DialogModes.Add,
    bookId: 'str0001',
    chapterId: '',
  },
};

