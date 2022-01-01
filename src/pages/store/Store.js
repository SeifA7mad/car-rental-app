import { Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import classes from './Store.module.css';
import '../../css/cars-style.css';

import { AuthContext } from '../../store/auth-context';

import Vehicles from '../../components/vehicle/Vehicles';
import VehicleDesc from '../../components/vehicle/vehicle-desc/VehicleDesc';
import ReservationForm from '../../components/reservation/ReservationForm';

const Store = () => {
  const { isLoggedIn } = useContext(AuthContext);
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
        {isLoggedIn && (
          <Route path='/reservation/:id' element={<ReservationForm />} />
        )}
        <Route path='*' element={<Navigate to='/store' />} />
      </Routes>
    </section>
  );
};

export default Store;
