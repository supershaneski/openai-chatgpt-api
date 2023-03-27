import CharacterDialog, { DialogModes } from './characterdialog';

export default {
  title: 'ChatGPT/CharacterDialog',
  component: CharacterDialog,
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
    chapterId: 'cha0002',
    characterId: 'chr0002',
  },
};

export const Add = {
  args: {
    mode: DialogModes.Add,
    bookId: 'str0001',
    chapterId: 'cha0002',
    characterId: '',
  },
};

