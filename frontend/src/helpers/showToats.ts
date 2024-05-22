import { CSSProperties } from 'react';
import toast, { ToastOptions } from 'react-hot-toast';

export const showToast = (message: string, success: boolean) => {
   const toastOptions: ToastOptions = {
      style: {
         fontWeight: '500',
         border: '2px solid rgba(255, 255, 255, 0.1)',
         padding: '10px',
         color: '#fff',
         backgroundColor: 'rgba(0, 0, 0, 0.1)',
         backdropFilter: 'blur(10px)',
         fontSize: '1rem',
         minWidth: '10em',
         letterSpacing: '-0.05em',
      } as CSSProperties,
      iconTheme: {
         primary: '#000',
         secondary: '#fff',
      },
      duration: 3000,
   };

   toast[success ? 'success' : 'error'](message, toastOptions);
};
