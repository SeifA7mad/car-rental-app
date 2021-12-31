import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

import { useContext } from 'react';

import { AuthContext } from './store/auth-context';

import Auth from './pages/auth/Auth';
import Store from './pages/store/Store';

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
        <Route path='*' element={<Navigate to='/store' />} />
        <Route path='/auth' element={<Navigate to='/auth/login' />} />
      </Routes>
    </>
  );
};

export default App;
