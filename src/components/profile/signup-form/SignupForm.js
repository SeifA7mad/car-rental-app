import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import useHttp from '../../../hooks/use-http';

import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';
import ErrorMessage from '../../ui/error-message/ErrorMessage';
import IconText from '../../ui/icons/IconText';

import classes from './SignupForm.module.css';

const validateEmpty = (value) => {
  return value.trim() !== '';
};

const SignupForm = () => {
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const confirmPassInputRef = useRef();

  // fetch hook
  const { isLoading, error: errorRequest, fetchData: signupRequest } = useHttp();

  const getRequestData = (dataObj) => {
      console.log(dataObj);
      setSuccessMsg(dataObj.message);
      navigate('/store');
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const emailValue = emailInputRef.current.value;
    const passValue = passInputRef.current.value;
    const nameValue = nameInputRef.current.value;
    const confirmPassValue = confirmPassInputRef.current.value;

    // inputs validation
    const inputsEmpty =
      !validateEmpty(emailValue) ||
      !validateEmpty(passValue) ||
      !validateEmpty(nameValue) ||
      !validateEmpty(confirmPassValue);

    if (inputsEmpty) {
      setError('Fill the fields');
      return;
    }

    signupRequest(
      {
        url: 'http://localhost:3000/auth/signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          email: emailValue,
          password: passValue,
          name: nameValue,
          confirmPassword: confirmPassValue,
        },
      },
      getRequestData.bind(null)
    );

    setError('');
  };

  return (
    <div className={classes.signupForm}>
      <h3> Signup </h3>
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
        <Button type='submit'> Signup </Button>
        {!!successMsg && (
          <IconText icon='fa fa-times-circle' textInfo={successMsg} />
        )}
      </form>
    </div>
  );
};

export default SignupForm;
