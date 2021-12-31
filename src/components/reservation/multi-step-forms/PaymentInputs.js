import Input from "../../ui/input/Input"
const PaymentInputs = ({inputObj}) => {

    const cardNumberInput = inputObj.cardNumberInput;
    const expiryMonthInput = inputObj.expiryMonthInput;
    const expiryYearInput = inputObj.expiryYearInput;
    const cardCvcInput = inputObj.cardCvcInput;
    return (
      <>
        <Input
          type='text'
          name='cardNumber'
          label='Enter Card number'
          onChange={cardNumberInput.onChangeInputValueHandler}
          value={cardNumberInput.value}
          onBlur={cardNumberInput.onBlurInputHanlder}
          error={cardNumberInput.inputHasAnError ? cardNumberInput.error : null}
        />
        <Input
          type='number'
          name='expireMonth-date'
          label='Expire Month Date'
          onChange={expiryMonthInput.onChangeInputValueHandler}
          value={expiryMonthInput.value}
          placeholder={'mm'}
          onBlur={expiryMonthInput.onBlurInputHanlder}
          error={
            expiryMonthInput.inputHasAnError ? expiryMonthInput.error : null
          }
        />
        <Input
          type='number'
          name='expireYear-date'
          label='Expire Year Date'
          onChange={expiryYearInput.onChangeInputValueHandler}
          value={expiryYearInput.value}
          placeholder={'yyyy'}
          onBlur={expiryYearInput.onBlurInputHanlder}
          error={expiryYearInput.inputHasAnError ? expiryYearInput.error : null}
        />
        <Input
          type='text'
          name='cvv'
          label='Enter Card cvv'
          onChange={cardCvcInput.onChangeInputValueHandler}
          value={cardCvcInput.value}
          placeholder={'***'}
          onBlur={cardCvcInput.onBlurInputHanlder}
          error={cardCvcInput.inputHasAnError ? cardCvcInput.error : null}
        />
      </>
    );
}

export default PaymentInputs
