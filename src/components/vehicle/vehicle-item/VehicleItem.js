import { useNavigate } from 'react-router';

import classes from './VehicleItem.module.css';
import '../../../css/cars-style.css';
import Button from '../../ui/button/Button';

const VehicleItem = ({ id, title, type, price, imgURL }) => {
    const navigate = useNavigate();
  return (
    <div className='col-md-3'>
      <div className='car-wrap ftco-animate fadeInUp ftco-animated'>
        <div
          className='img d-flex align-items-end'
          style={{ backgroundImage: `url(${imgURL})` }}
        >
          <div className='price-wrap d-flex'>
            <span className='rate'>{price} USD</span>
            <p className='from-day'>
              <span>From</span>
              <span>/Day</span>
            </p>
          </div>
        </div>
        <div className='text p-4 text-center'>
          <h2 className='mb-0'>{title}</h2>
          <span>{type}</span>
          <p className='d-flex mb-0 d-block'>
            <Button
              type='link'
              className='btn btn-black btn-outline-black mr-1'
              click={() => navigate(`reservation/${id}`)}
            >
              Book now
            </Button>
            <Button
              click={() => navigate(`${id}`)}
              type='link'
              className='btn btn-black btn-outline-black ml-1'
            >
              Details
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleItem;
