import { TypeOptions, toast } from 'react-toastify';

export const toastNotify = (type: TypeOptions, message: string) => {
  if (type === 'error' && !message) {
    message = 'Something went Wrong';
  }
  toast(message, { type });
};
