import { useRef, useContext } from 'react';

import useHttp from '../../../hooks/use-http';

import { AuthContext } from '../../../store/auth-context';

import classes from './AddVehicleForm.module.css';
import '../../../css/add-style.css';

const validateEmpty = (value) => {
  return value.trim() !== '';
};

const AddVehicleForm = () => {
  const titleInputRef = useRef();
  const manufactureInputRef = useRef();
  const typeInputRef = useRef();
  const descriptionInputRef = useRef();
  const rentalInfoInputRef = useRef();
  const priceInputRef = useRef();
  const yearInputRef = useRef();
  const imgURLInputRef = useRef();
  const availableCountInputRef = useRef();
  const recommendedForInputRef = useRef();

  const {
    isLoading,
    error: errorRequest,
    fetchData: addVehicleRequest,
  } = useHttp();

  const { userToken } = useContext(AuthContext);

  const getAddedVehileData = (dataObj) => {
    console.log(dataObj);
  }

  const onSubmitFormHandler = (event) => {
    event.preventDefault();

    const titleValue = titleInputRef.current.value;
    const manufactureValue = manufactureInputRef.current.value;
    const typeValue = typeInputRef.current.value;
    const descriptionValue = descriptionInputRef.current.value;
    const rentalInfoValue = rentalInfoInputRef.current.value;
    const priceValue = priceInputRef.current.value;
    const yearValue = yearInputRef.current.value;
    const imgURLValue = imgURLInputRef.current.value;
    const availableCountValue = availableCountInputRef.current.value;
    const recommendedForValue = recommendedForInputRef.current.value;

    // inputs validation
    const inputsEmpty =
      !validateEmpty(titleValue) ||
      !validateEmpty(manufactureValue) ||
      !validateEmpty(typeValue) ||
      !validateEmpty(rentalInfoValue) ||
      !validateEmpty(yearValue) ||
      !validateEmpty(imgURLValue) ||
      !validateEmpty(recommendedForValue);

    if (inputsEmpty) {
      return;
    }

    addVehicleRequest(
      {
        url: 'http://localhost:3000/admin/add-vehicle',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.token,
        },
        body: {
          title: titleValue,
          manufacture: manufactureValue,
          type: typeValue,
          description: descriptionValue,
          rentalInfo: rentalInfoValue,
          price: priceValue,
          year: yearValue,
          imgURL: [imgURLValue],
          availableCount: availableCountValue,
          recommendedFor: recommendedForValue,
        },
      },
      getAddedVehileData.bind(null)
    );
  };
  return (
    <div className='page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins'>
      <div className='wrapper wrapper--w780'>
        <div className='card card-3'>
          <div className='card-heading'></div>
          <div className='card-body'>
            <h2 className='title'>ADD NEW CAR</h2>
            <form onSubmit={onSubmitFormHandler}>
              <div className='input-group'>
                <input
                  className='input--style-3'
                  type='text'
                  placeholder='Title'
                  name='title'
                  ref={titleInputRef}
                />
              </div>
              <div className='input-group'>
                <input
                  className='input--style-3'
                  type='text'
                  placeholder='Manufacture'
                  name='Manufacture'
                  ref={manufactureInputRef}
                />
              </div>
              <div className='input-group'>
                <input
                  className='input--style-3'
                  type='text'
                  placeholder='Year'
                  name='Year'
                  ref={yearInputRef}
                />
              </div>
              <div className='input-group'>
                <input
                  className='input--style-3'
                  type='number'
                  placeholder='Price per day'
                  name='Price per day'
                  ref={priceInputRef}
                />
              </div>
              <div className='input-group'>
                <input
                  className='input--style-3'
                  type='number'
                  placeholder='availableCount'
                  name='availableCount'
                  ref={availableCountInputRef}
                />
              </div>
              <div className='input-group'>
                <div className='rs-select2 js-select-simple select--no-search'>
                  <select name='Type' ref={typeInputRef}>
                    <option disabled='disabled' defaultValue>
                      Type
                    </option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Hatchback</option>
                  </select>
                </div>
              </div>
              <div className='input-group'>
                <input
                  className='input--style-3'
                  type='text'
                  placeholder='description'
                  name='description'
                  ref={descriptionInputRef}
                />
              </div>
              <div className='input-group'>
                <input
                  className='input--style-3'
                  type='text'
                  placeholder='rental Info'
                  name='rental Info'
                  ref={rentalInfoInputRef}
                />
              </div>
              <div className='input-group'>
                <input
                  className='input--style-3'
                  type='text'
                  placeholder='recommendedFor'
                  name='recommendedFor'
                  ref={recommendedForInputRef}
                />
              </div>
              <div className='input-group'>
                <input
                  className='input--style-3'
                  type='text'
                  placeholder='imgURL'
                  name='imgURL'
                  ref={imgURLInputRef}
                />
              </div>
              <div className='p-t-10'>
                <button className='btn btn--pill btn--green' type='submit'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleForm;
