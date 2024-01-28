import { toast } from 'react-hot-toast';

toast.info = (message) => {
  return toast(message, {
    icon: 'ℹ️',
    className: 'bg-blue-500 text-white',
  });
};

toast.danger = (message) => {
  return toast(message, {
    icon: '⚠️',
    className: 'bg-red-500 text-white',
  });
};

export default toast;