import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { t } from 'i18next';

const Notify = {
  error: (message, autoClose) => {
    Notify.invoke('error', Array.isArray(message) ? message[0] : message, autoClose);
  },
  success: (message, autoClose) => {
    Notify.invoke('success', Array.isArray(message) ? message[0] : message, autoClose);
  },
  warn: (message, autoClose) => {
    Notify.invoke('warn', Array.isArray(message) ? message[0] : message, autoClose);
  },
  invoke: (type, text, autoClose) => {
    toast[type](text, {
      position: 'top-right',
      autoClose: autoClose ?? 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
};

export default Notify;
