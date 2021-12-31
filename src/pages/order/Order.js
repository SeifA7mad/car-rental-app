import Orders from '../../components/order/Orders';
import '../../css/cars-style.css';

const Order = () => {
  return (
    <section className='ftco-section'>
      <div className='container-fluid px-4'>
        <div className='row justify-content-center'>
          <div className='col-md-12 heading-section text-center ftco-animate mb-5 fadeInUp ftco-animated'>
            <span className='subheading'>Look</span>
            <h2 className='mb-2'>YOUR ORDERS!</h2>
          </div>
        </div>
      </div>
      <Orders />
    </section>
  );
};

export default Order;
