import DeleteDialog, { DeleteModes } from './deletedialog'

export default {
  title: 'ChatGPT/DeleteDialog',
  component: DeleteDialog,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'close' },
    onDelete: { action: 'delete' },
    mode: {
        options: ['character', 'scene'],
        control: { type: 'radio' }
    }
  },
}

export const Primary = {
    args: {
        mode: DeleteModes.Character,
    }
}

export const Secondary = {
    args: {
        mode: DeleteModes.Scene,
    }
}
