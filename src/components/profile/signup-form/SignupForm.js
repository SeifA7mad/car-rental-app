import { useRef, useState } from 'react';

import useHttp from '../../../hooks/use-http';

import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';
import ErrorMessage from '../../ui/error-message/ErrorMessage';

import classes from './SignupForm.module.css';

const SignupForm = () => {
  const [error, setError] = useState('');

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const confirmPassInputRef = useRef();

  // fetch hook
  const { isLoading, error: errorRequest, fetchData: loginRequest } = useHttp();

  const getRequestData = (userData) => {};

  const submitFormHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.SignupForm}>
      <h3> Login </h3>
      {!!error && <ErrorMessage className={classes.error} errorText={error} />}
      {errorRequest && (
        <ErrorMessage className={classes.error} errorText={errorRequest} />
      )}
      <form onSubmit={submitFormHandler}>
        <Input type='text' placeholder='Name' ref={nameInputRef} name='Name' />
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
        <Input
          type='password'
          placeholder='Confirm Password'
          ref={confirmPassInputRef}
          name='ConfirmPassword'
        />
        <Button type='submit'> Login </Button>
      </form>
    </div>
  );
};

export default SignupForm;
