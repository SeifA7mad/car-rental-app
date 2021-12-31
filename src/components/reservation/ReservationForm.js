import { useState, useContext } from 'react';

import { useParams } from 'react-router-dom';

import { AuthContext } from '../../store/auth-context';
import useHttp from '../../hooks/use-http';

import UseInput from '../../hooks/use-input';
import MultiStepProgressBar from '../ui/multi-step-progress-bar/MultiStepProgressBar';
import Button from '../ui/button/Button';
import classes from './ReservationForm.module.css';
import ReserveInputs from './multi-step-forms/ReserveInputs';
import PaymentInputs from './multi-step-forms/PaymentInputs';

// funtion: to validate if the input value is empty or not
const validateInputs = (inputValue) => {
  const notEmpty = inputValue.trim() !== '';

  return {
    inputValueIsValid: notEmpty,
    error: 'Info Required',
  };
};

// component: multi-step form with progressbar
const ReservationForm = () => {
  // inputs for the reservation form
  const pickingDateInput = UseInput(validateInputs);
  const returningDateInput = UseInput(validateInputs);
  const pickingLocationInput = UseInput(validateInputs);
  const requestDriverInput = UseInput(validateInputs);
  const requestInsuranceInput = UseInput(validateInputs);

  // inputs for the payment form
  const cardNumberInput = UseInput(validateInputs);
  const expiryMonthInput = UseInput(validateInputs);
  const expiryYearInput = UseInput(validateInputs);
  const cardCvcInput = UseInput(validateInputs);

  // overall form validaty to know if the user can submit or not
  const formValidaty =
    !pickingDateInput.inputValueIsValid ||
    !returningDateInput.inputValueIsValid ||
    !pickingLocationInput.inputValueIsValid ||
    !requestDriverInput.inputValueIsValid ||
    !requestInsuranceInput.inputValueIsValid ||
    !cardCvcInput.inputValueIsValid;

  // map for the different forms in the multi-step form
  const formContent = [
    <ReserveInputs
      inputObj={{
        pickingDateInput,
        returningDateInput,
        pickingLocationInput,
        requestDriverInput,
        requestInsuranceInput,
      }}
    />,
    <PaymentInputs
      inputObj={{
        cardNumberInput,
        expiryMonthInput,
        expiryYearInput,
        cardCvcInput,
      }}
    />,
  ];

  const { id: vehicleId } = useParams();

  const { userToken } = useContext(AuthContext);

   const {
     isLoading,
     error: errorRequest,
     fetchData: placeOrderRequest,
   } = useHttp();

  // state: to handle the forms has been visted
  const [activeLength, setActiveLength] = useState(1);

  // array for the diff text & icons in the progressbar
  const progressContent = [
    { text: 'Reservation', icon: 'fa fa-handshake-o' },
    {
      text: 'Payment',
      icon: 'fa fa-credit-card',
    },
  ];

  const onNextHandler = () => {
    setActiveLength((prevState) => ++prevState);
  };

  const onPreviousHandler = () => {
    setActiveLength((prevState) => --prevState);
  };

  const recivedDataHandler = (dataObj) => {
    console.log(dataObj);
    //navigate to orders
  }

  const onSubmitHandler = (event) => {

    event.preventDefault();
    // if (!formValidaty) {
    //   return;
    // }

    placeOrderRequest(
      {
        url: 'http://localhost:3000/store/place-order',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.token,
        },
        body: {
          vehicleId: vehicleId,
          orderDetails: {
            pickingDate: pickingDateInput.value,
            returningDate: returningDateInput.value,
            pickingLocation: pickingLocationInput.value,
            requestDriver: requestDriverInput.value,
            requestInsurance: requestInsuranceInput.value,
          },
          paymentDetails: {
            cardNumber: cardNumberInput.value,
            expiryMonth: expiryMonthInput.value,
            expiryYear: expiryYearInput.value,
            cardCvc: cardCvcInput.value,
          },
        },
      },
      recivedDataHandler.bind(null)
    );

  };

  return (
    <>
      <MultiStepProgressBar
        progressContent={progressContent}
        activeLength={activeLength}
      />
      <form className={classes.reservationForm} onSubmit={onSubmitHandler}>
        <div className={classes.inputs}>{formContent[activeLength - 1]}</div>
        <div className={classes.buttons}>
          {activeLength > 1 && (
            <Button type='link' click={onPreviousHandler}>
              Previous
            </Button>
          )}
          {activeLength === progressContent.length && (
            <Button type='submit' disabled={formValidaty}>
              Reserve
            </Button>
          )}
          {activeLength !== progressContent.length && (
            <Button type='link' click={onNextHandler}>
              Next
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default ReservationForm;
