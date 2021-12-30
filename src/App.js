import { Route, Routes } from 'react-router-dom';

import Auth from './pages/auth/Auth';
import Store from './pages/store/Store';


const App = () => {
  return (
    <Routes>
      <Route path='/auth/*' element={<Auth />} />
      <Route path='/store/*' element={<Store />} />
    </Routes>
  );
};

export default App;
