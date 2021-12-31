import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

import { useContext } from 'react';

import { AuthContext } from './store/auth-context';

import Auth from './pages/auth/Auth';
import Store from './pages/store/Store';
import Order from './pages/order/Order';
import Admin from './pages/admin/Admin';

const App = () => {

  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      {isLoggedIn && (
        <header>
          <Navbar />
        </header>
      )}
      <Routes>
        {!isLoggedIn && <Route path='/auth/*' element={<Auth />} />}
        <Route path='/store/*' element={<Store />} />
        <Route path='/orders/*' element={<Order />} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/auth' element={<Navigate to='/auth/login' />} />
        <Route path='*' element={<Navigate to='/store' />} />
      </Routes>
    </>
  );
};

export default App;
