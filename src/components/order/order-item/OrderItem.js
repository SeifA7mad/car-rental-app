import { useNavigate } from 'react-router';

import classes from './OrderItem.module.css';
import '../../../css/cars-style.css';
import Button from '../../ui/button/Button';

const OrderItem = ({id, trackingDetails, vehicle, totalPrice, orderDate, onCanel}) => {
  const navigate = useNavigate();

  return (
    <div className='col-md-3'>
      <div className='car-wrap ftco-animate fadeInUp ftco-animated'>
        <div
          className='img d-flex align-items-end'
          style={{ backgroundImage: `url(${vehicle.imgURL})` }}
        >
          <div className='price-wrap d-flex'>
            <span className='rate'>{totalPrice} USD</span>
            <p className='from-day'>
              <span>Total</span>
              <span>/Price</span>
            </p>
          </div>
        </div>
      </div>
      <div className='text p-4 text-center'>
        <h2 className='mb-0'>{vehicle.title}</h2>
        <span>{orderDate}</span>
        <p>{trackingDetails.status}</p>
        <p>Picking Date: {trackingDetails.pickingDate}</p>
        <p>Picking Location: {trackingDetails.pickingLocation}</p>
        <p>Returning Date: {trackingDetails.returningDate}</p>
        <p className='d-flex mb-0 d-block'>
          <Button
            type='link'
            className='btn btn-black btn-outline-black mr-1'
            click={() => {
              onCanel(id);
            }}
          >
            Cancel
          </Button>
          <Button
            click={() => {navigate(id)}}
            type='link'
            className='btn btn-black btn-outline-black ml-1'
          >
            EDIT
          </Button>
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
