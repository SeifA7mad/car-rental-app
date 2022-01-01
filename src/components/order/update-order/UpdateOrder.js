import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useHttp from '../../../hooks/use-http';
import UseInput from '../../../hooks/use-input';

import Input from '../../ui/input/Input';
import { AuthContext } from '../../../store/auth-context';
import classes from './UpdateOrder.module.css';
import '../../../css/add-style.css';

const validateInputs = (inputValue) => {
  const notEmpty = inputValue.trim() !== '';

  return {
    inputValueIsValid: notEmpty,
    error: 'Info Required',
  };
};

const UpdateOrder = () => {
  const pickingLocationInput = UseInput(validateInputs);
  const requestDriverInput = UseInput(validateInputs);
  const requestInsuranceInput = UseInput(validateInputs);

  const formValidaty =
    !pickingLocationInput.inputValueIsValid ||
    !requestDriverInput.inputValueIsValid ||
    !requestInsuranceInput.inputValueIsValid;

  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState({});

  const {
    isLoadingVehicles,
    error: errorRequestVehicles,
    fetchData: getOrder,
  } = useHttp();

  const { isLoading, error: errorRequest, fetchData: sendData } = useHttp();

  const { userToken } = useContext(AuthContext);

  const setOrderData = (orderData) => {
      const foramtedOrderData = {
        pickingLocation: orderData.trackingDetails.pickingLocation,
        requestDriver: orderData.additionalServices.requestDriver.toString(),
        requestInsurance: orderData.additionalServices.requestInsurance.toString(),
      };
    setOrder(foramtedOrderData);
  };

  const getData = (dataObj) => {
    console.log(dataObj);
    navigate('/orders');
  };

  useEffect(() => {
    getOrder(
      {
        url: `http://localhost:3000/store/edit-order/${id}?edit=true`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.token,
        },
      },
      setOrderData.bind(null)
    );
  }, []);

  const onSubmitFormHandler = (event) => {
    event.preventDefault();

    if (formValidaty) {
      console.log('invalid');
      return;
    }

    sendData(
      {
        url: `http://localhost:3000/store/edit-order`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.token,
        },
        body: {
          orderId: id,
          pickingLocation: pickingLocationInput.value,
          requestDriver: requestDriverInput.value,
          requestInsurance: requestInsuranceInput.value,
        },
      },
      getData.bind(null)
    );
  };

  return (
    <div className='wrapper wrapper--w780'>
      <div className='card card-3'>
        <div className='card-heading'></div>
        <div className='card-body'>
          <h2 className='title'>UPDATE ORDER DETAILS</h2>
          <form onSubmit={onSubmitFormHandler}>
            <h5 style={{ color: 'yellow' }}>Enter pickingLocation </h5>
            <br />
            <div className={'input-group'}>
              <Input
                className='input--style-3'
                type='text'
                onChange={pickingLocationInput.onChangeInputValueHandler}
                value={pickingLocationInput.value}
                placeholder={order.pickingLocation}
                onBlur={pickingLocationInput.onBlurInputHanlder}
                error={
                  pickingLocationInput.inputHasAnError
                    ? pickingLocationInput.error
                    : null
                }
              />
            </div>
            <h5 style={{ color: 'yellow' }}>requestDriver</h5>
            <br />
            <div className='input-group'>
              <Input
                className='input--style-3'
                type='text'
                onChange={requestDriverInput.onChangeInputValueHandler}
                value={requestDriverInput.value}
                placeholder={order.requestDriver}
                onBlur={requestDriverInput.onBlurInputHanlder}
                error={
                  requestDriverInput.inputHasAnError
                    ? requestDriverInput.error
                    : null
                }
              />
            </div>
            <h5 style={{ color: 'yellow' }}>requestInsurance</h5>
            <br />
            <div className='input-group'>
              <Input
                className='input--style-3'
                type='text'
                onChange={requestInsuranceInput.onChangeInputValueHandler}
                value={requestInsuranceInput.value}
                placeholder={order.requestInsurance}
                onBlur={requestInsuranceInput.onBlurInputHanlder}
                error={
                  requestInsuranceInput.inputHasAnError
                    ? requestInsuranceInput.error
                    : null
                }
              />
            </div>
            <div className='p-t-10'>
              <button
                className='btn btn--pill btn--green'
                type='submit'
                disabled={formValidaty}
              >
                SAVE CHANGES
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
