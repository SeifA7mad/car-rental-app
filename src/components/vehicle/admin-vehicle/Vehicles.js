import { useEffect, useState, useContext } from 'react';

import useHttp from '../../../hooks/use-http';

import { AuthContext } from '../../../store/auth-context';

import ErrorMessage from '../../ui/error-message/ErrorMessage';
import VehicleItem from './vehicle-item/VehicleItem';

import classes from './Vehicles.module.css';

const Vehicles = () => {
  const [vehicleList, setVehicleList] = useState([]);

  const {
    isLoadingVehicles,
    error: errorRequestVehicles,
    fetchData: getVehicles,
  } = useHttp();

  const {
    isLoading,
    error: errorRequest,
    fetchData: removeVehicle,
  } = useHttp();

  const { userToken } = useContext(AuthContext);

  const setVehicleData = (vehicleData) => {
    setVehicleList(vehicleData);
  };

  const onDeleteVehicle = (dataObj, id) => {
    if (!dataObj) {
      return;
    }
    const newVehicleList = vehicleList.filter((vehicle) => vehicle._id !== id);
    setVehicleList(newVehicleList);
  };

  useEffect(() => {
    if (vehicleList.length > 0) {
      return;
    }
    getVehicles(
      {
        url: 'http://localhost:3000/admin/vehicles',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.token,
        },
      },
      setVehicleData.bind(null)
    );
  }, [vehicleList]);

  const onRemoveVehicleHandler = (id) => {
    removeVehicle(
      {
        url: 'http://localhost:3000/admin/delete-vehicle',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.token,
        },
        body: {
          vehicleId: id,
        },
      },
      onDeleteVehicle.bind(null)
    );
  };

  let content = (
    <ErrorMessage errorText='No Vehicles Added try adding one :(' />
  );

  if (vehicleList.length > 0) {
    content = vehicleList.map((vehicle) => (
      <VehicleItem
        key={vehicle._id}
        id={vehicle._id}
        title={vehicle.title}
        type={vehicle.type}
        price={vehicle.price}
        imgURL={vehicle.imgURL[0]}
        onRemove={onRemoveVehicleHandler}
      />
    ));
  }
  return <div className={classes.vehicles}>{content}</div>;
};

export default Vehicles;
