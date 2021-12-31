import { Route, Routes } from 'react-router-dom';

import AddVehicleForm from '../../components/vehicle/admin-vehicle/add-vehicle/AddVehicleForm';
import Vehicles from '../../components/vehicle/admin-vehicle/Vehicles';
import '../../css/cars-style.css';

const Admin = () => {
  return (
    <section className='ftco-section'>
      <div className='container-fluid px-4'>
        <div className='row justify-content-center'>
          <div className='col-md-12 heading-section text-center ftco-animate mb-5 fadeInUp ftco-animated'>
            <span className='subheading'>Admin</span>
            <h2 className='mb-2'>LIST OF VEHICLES</h2>
          </div>
        </div>
      </div>
      <Routes>
        <Route path='/addNewCar' element={<AddVehicleForm />} />
        <Route path='/vehicles' element={<Vehicles />} />
      </Routes>
    </section>
  );
};

export default Admin;
