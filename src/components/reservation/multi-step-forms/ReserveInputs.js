import Input from '../../ui/input/Input';

const ReserveInputs = ({ inputObj }) => {
  const pickingDateInput = inputObj.pickingDateInput;
  const returningDateInput = inputObj.returningDateInput;
  const pickingLocationInput = inputObj.pickingLocationInput;
  const requestDriverInput = inputObj.requestDriverInput;
  const requestInsuranceInput = inputObj.requestInsuranceInput;

  return (
    <>
      <Input
        type='date'
        name='pickingDate'
        label='Choose Picking Date'
        onChange={pickingDateInput.onChangeInputValueHandler}
        value={pickingDateInput.value}
        onBlur={pickingDateInput.onBlurInputHanlder}
        error={pickingDateInput.inputHasAnError ? pickingDateInput.error : null}
      />
      <Input
        type='date'
        name='returningDate'
        label='Choose Returning Date'
        onChange={returningDateInput.onChangeInputValueHandler}
        value={returningDateInput.value}
        onBlur={returningDateInput.onBlurInputHanlder}
        error={
          returningDateInput.inputHasAnError ? returningDateInput.error : null
        }
      />
      <Input
        type='text'
        name='details'
        label='Type Picking Location'
        onChange={pickingLocationInput.onChangeInputValueHandler}
        value={pickingLocationInput.value}
        onBlur={pickingLocationInput.onBlurInputHanlder}
        error={
          pickingLocationInput.inputHasAnError ? returningDateInput.error : null
        }
      />
      <Input
        type='text'
        name='requestDriver'
        label='Request a Driver?'
        onChange={requestDriverInput.onChangeInputValueHandler}
        value={requestDriverInput.value}
      />
      <Input
        type='text'
        name='requestInsurance'
        label='Request Insurance?'
        onChange={requestInsuranceInput.onChangeInputValueHandler}
        value={requestInsuranceInput.value}
      />
    </>
  );
};

export default ReserveInputs;
