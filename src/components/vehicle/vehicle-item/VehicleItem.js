import classes from './VehicleItem.module.css';
import '../../../css/cars-style.css';


const VehicleItem = ({ id, title, type, price, imgURL }) => {
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
            <a href='book.html' className='btn btn-black btn-outline-black mr-1'>
              Book now
            </a>
            <a
              href='car-details1.html'
              className='btn btn-black btn-outline-black ml-1'
            >
              Details
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleItem;
