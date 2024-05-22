import React from 'react';
import AppRoutes from '@/routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
   return (
      <>
         <Toaster position="top-right" reverseOrder={false} />
         <AppRoutes />
      </>
   );
};

export default App;
