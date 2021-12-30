import { Route, Routes, Redirect } from 'react-router-dom';

import Auth from './pages/auth/Auth';

const App = () => {
  return (
    <Routes>
      <Route path='/auth/*' element={<Auth />}/>
    </Routes>
  );
};

export default App;
