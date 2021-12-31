import { useEffect, useState } from 'react';

import useHttp from '../../hooks/use-http';

import ErrorMessage from '../ui/error-message/ErrorMessage';
import VehicleItem from './vehicle-item/VehicleItem';

import classes from './Vehicles.module.css';

const Vehicles = () => {
  const [vehicleList, setVehicleList] = useState([]);

  const { isLoading, error: errorRequest, fetchData: getVehicles } = useHttp();

   const setVehicleData = (vehicleData) => {
       setVehicleList(vehicleData);
   };

  useEffect(() => {
    getVehicles(
      {
        url: 'http://localhost:3000/store/vehicles',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      setVehicleData.bind(null)
    );
  }, []);

  let content = <ErrorMessage errorText='No Vehicles for today :(' />;

  if (vehicleList.length > 0) {
    content = vehicleList.map((vehicle) => (
      <VehicleItem
        key={vehicle._id}
        id={vehicle._id}
        title={vehicle.title}
        type={vehicle.type}
        price={vehicle.price}
        imgURL={vehicle.imgURL[0]}
      />
    ));
  }
  return <div className={classes.vehicles}>{content}</div>;
};

export default Vehicles;
