import { Route, Routes } from 'react-router-dom';

import LoginForm from '../../components/profile/login-form/LoginForm';
import SignupForm from '../../components/profile/signup-form/SignupForm';

import classes from './Auth.module.css';

const Login = () => {
  return (
    <div className={classes.login}>
      <div className={classes.leftContainer}>
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
        </Routes>
      </div>
      <div className={classes.rightContainer}></div>
    </div>
  );
};

export default Login;
