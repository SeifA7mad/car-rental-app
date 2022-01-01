import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useHttp from '../../../../hooks/use-http';
import UseInput from '../../../../hooks/use-input';

import Input from '../../../ui/input/Input';
import { AuthContext } from '../../../../store/auth-context';

import classes from './UpdateVehicle.module.css';
import '../../../../css/add-style.css';

const validateInputs = (inputValue) => {
  const notEmpty = inputValue.trim() !== '';

  return {
    inputValueIsValid: notEmpty,
    error: 'Info Required',
  };
};

const UpdateVehicle = () => {
  const typeInput = UseInput(validateInputs);
  const descriptionInput = UseInput(validateInputs);
  const rentalInfoInput = UseInput(validateInputs);
  const priceInput = UseInput(validateInputs);
  const imgURLInput = UseInput(validateInputs);
  const availableCountInput = UseInput(validateInputs);
  const recommendedForInput = UseInput(validateInputs);

  const formValidaty =
    !typeInput.inputValueIsValid ||
    !descriptionInput.inputValueIsValid ||
    !rentalInfoInput.inputValueIsValid ||
    !priceInput.inputValueIsValid ||
    !imgURLInput.inputValueIsValid ||
    !availableCountInput.inputValueIsValid ||
    !recommendedForInput.inputValueIsValid;

  const { id } = useParams();

  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState({});

  const {
    isLoadingVehicles,
    error: errorRequestVehicles,
    fetchData: getVehicles,
  } = useHttp();

  const { isLoading, error: errorRequest, fetchData: sendData } = useHttp();

  const { userToken } = useContext(AuthContext);

  const setVehicleData = (vehicleData) => {
    setVehicle(vehicleData);
  };

  const getData = (dataObj) => {
      console.log(dataObj);
      navigate('/admin/vehicles');
  }

  useEffect(() => {
    getVehicles(
      {
        url: `http://localhost:3000/admin/edit-vehicle/${id}?edit=true`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.token,
        },
      },
      setVehicleData.bind(null)
    );
  }, [vehicle]);

  const onSubmitFormHandler = (event) => {
    event.preventDefault();

    if (formValidaty) {
      console.log('invalid');
      return;
    }

    sendData(
      {
        url: `http://localhost:3000/admin/edit-vehicle`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.token,
        },
        body: {
          vehicleId: id,
          type: typeInput.value,
          description: descriptionInput.value,
          rentalInfo: rentalInfoInput.value,
          price: priceInput.value,
          imgURL: imgURLInput.value,
          availableCount: availableCountInput.value,
          recommendedFor: recommendedForInput.value,
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
          <h2 className='title'>UPDATE CAR DETAILS</h2>
          <form onSubmit={onSubmitFormHandler}>
            <h5 style={{ color: 'yellow' }}>Enter vehicle type</h5>
            <br />
            <div className={'input-group'}>
              <Input
                className='input--style-3'
                type='text'
                onChange={typeInput.onChangeInputValueHandler}
                value={typeInput.value}
                placeholder={vehicle.type}
                onBlur={typeInput.onBlurInputHanlder}
                error={typeInput.inputHasAnError ? typeInput.error : null}
              />
            </div>
            <h5 style={{ color: 'yellow' }}>description</h5>
            <br />
            <div className='input-group'>
              <Input
                className='input--style-3'
                type='text'
                name='description'
                onChange={descriptionInput.onChangeInputValueHandler}
                value={descriptionInput.value}
                placeholder={vehicle.description}
                onBlur={descriptionInput.onBlurInputHanlder}
                error={
                  descriptionInput.inputHasAnError
                    ? descriptionInput.error
                    : null
                }
              />
            </div>
            <h5 style={{ color: 'yellow' }}>rentalInfo</h5>
            <br />
            <div className='input-group'>
              <Input
                className='input--style-3'
                type='text'
                name='rentalInfo'
                onChange={rentalInfoInput.onChangeInputValueHandler}
                value={rentalInfoInput.value}
                placeholder={vehicle.rentalInfo}
                onBlur={rentalInfoInput.onBlurInputHanlder}
                error={
                  rentalInfoInput.inputHasAnError ? rentalInfoInput.error : null
                }
              />
            </div>
            <h5 style={{ color: 'yellow' }}>price</h5>
            <br />
            <div className='input-group'>
              <Input
                className='input--style-3'
                type='number'
                name='price'
                onChange={priceInput.onChangeInputValueHandler}
                value={priceInput.value}
                placeholder={vehicle.price}
                onBlur={priceInput.onBlurInputHanlder}
                error={priceInput.inputHasAnError ? priceInput.error : null}
              />
            </div>
            <h5 style={{ color: 'yellow' }}>availableCountInput</h5>
            <br />
            <div className='input-group'>
              <Input
                className='input--style-3'
                type='number'
                name='availableCountInput'
                onChange={availableCountInput.onChangeInputValueHandler}
                value={availableCountInput.value}
                placeholder={vehicle.availableCount}
                onBlur={availableCountInput.onBlurInputHanlder}
                error={
                  availableCountInput.inputHasAnError
                    ? availableCountInput.error
                    : null
                }
              />
            </div>
            <h5 style={{ color: 'yellow' }}>imgURLInput</h5>
            <div className='input-group'>
              <Input
                className='input--style-3'
                type='text'
                name='imgURLInput'
                onChange={imgURLInput.onChangeInputValueHandler}
                value={imgURLInput.value}
                placeholder={vehicle.imgURL}
                onBlur={imgURLInput.onBlurInputHanlder}
                error={imgURLInput.inputHasAnError ? imgURLInput.error : null}
              />
            </div>
            <h5 style={{ color: 'yellow' }}>recommendedFor</h5>
            <div className='input-group'>
              <Input
                className='input--style-3'
                type='text'
                name='recommendedFor'
                onChange={recommendedForInput.onChangeInputValueHandler}
                onBlur={recommendedForInput.onBlurInputHanlder}
                value={recommendedForInput.value}
                placeholder={vehicle.recommendedFor}
                error={
                  recommendedForInput.inputHasAnError
                    ? recommendedForInput.error
                    : null
                }
              />
            </div>
            <div className='p-t-10'>
              <button className='btn btn--pill btn--green' type='submit'>
                SAVE CHANGES
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateVehicle;
