import { useRef, useState, useContext } from 'react';

import {AuthContext} from '../../../store/auth-context';
import useHttp from '../../../hooks/use-http';

import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';
import ErrorMessage from '../../ui/error-message/ErrorMessage';

import classes from './LoginForm.module.css';

const validateEmpty = (value) => {
  return value.trim() !== '';
};

const LoginForm = () => {
  const [error, setError] = useState('');

  const emailInputRef = useRef();
  const passInputRef = useRef();

  const authCtx = useContext(AuthContext);

  // fetch hook
  const { isLoading, error: errorRequest, fetchData: loginRequest } = useHttp();

  const getUserData = (userData) => {
    authCtx.login(userData);
    setError('');
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const emailValue = emailInputRef.current.value;
    const passValue = passInputRef.current.value;

    // inputs validation
    const inputsEmpty = !validateEmpty(emailValue) || !validateEmpty(passValue);
    if (inputsEmpty) {
      setError('Fill the fields');
      return;
    }

    loginRequest(
      {
        url: 'http://localhost:3000/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { email: emailValue, password: passValue },
      },
      getUserData.bind(null)
    );
    
    setError('');
  };

  return (
    <div className={classes.loginForm}>
      <h3> Login </h3>
      {!!error && <ErrorMessage className={classes.error} errorText={error} />}
      {errorRequest && <ErrorMessage className={classes.error} errorText={errorRequest} />}
      <form onSubmit={submitFormHandler}>
        <Input
          type='text'
          placeholder='Email'
          ref={emailInputRef}
          name='Email'
        />
        <Input
          type='password'
          placeholder='Password'
          ref={passInputRef}
          name='Password'
        />
        <Button type='submit'> Login </Button>
      </form>
    </div>
  );
};

export default LoginForm;
