import React, { useEffect } from 'react';
import AppRoutes from '@/routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);
   return (
      <>
         <Toaster position="top-right" reverseOrder={false} />
         <AppRoutes />
      </>
   );
};

export default App;
