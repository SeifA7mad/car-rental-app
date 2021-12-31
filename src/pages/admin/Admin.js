import AddVehicleForm from '../../components/vehicle/add-vehicle/AddVehicleForm';
import '../../css/cars-style.css';

const Admin = () => {
  return (
    <section className='ftco-section'>
      <div className='container-fluid px-4'>
        <div className='row justify-content-center'>
          <div className='col-md-12 heading-section text-center ftco-animate mb-5 fadeInUp ftco-animated'>
            <span className='subheading'>Admin</span>
            <h2 className='mb-2'>ADD NEW CAR</h2>
          </div>
        </div>
      </div>
      <AddVehicleForm />
    </section>
  );
};

export default Admin;
