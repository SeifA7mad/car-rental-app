import { Route, Routes } from 'react-router-dom';

import classes from './Store.module.css';
import '../../css/cars-style.css';

import Vehicles from '../../components/vehicle/Vehicles';
import VehicleDesc from '../../components/vehicle/vehicle-desc/VehicleDesc';
import ReservationForm from '../../components/reservation/ReservationForm';

const Store = () => {
  return (
    <section className='ftco-section'>
      <div className='container-fluid px-4'>
        <div className='row justify-content-center'>
          <div className='col-md-12 heading-section text-center ftco-animate mb-5 fadeInUp ftco-animated'>
            <span className='subheading'>What we offer</span>
            <h2 className='mb-2'>Choose Your Car</h2>
          </div>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Vehicles />} />
        <Route path='/:id' element={<VehicleDesc />} />
        <Route path='/reservation/:id' element={<ReservationForm />} />
      </Routes>
    </section>
  );
};

export default Store;
