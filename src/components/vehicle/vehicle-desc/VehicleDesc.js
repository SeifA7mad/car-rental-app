import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import useHttp from '../../../hooks/use-http';
import ErrorMessage from '../../ui/error-message/ErrorMessage';

import classes from './VehicleDesc.module.css';

const VehicleDesc = () => {
  const [vehicleDetails, setVehicleDetails] = useState(null);

  const { id } = useParams();

  const { isLoading, error: errorRequest, fetchData: getVehicles } = useHttp();

  const setVehicleData = (vehicleData) => {
    setVehicleDetails(vehicleData);
  };

  useEffect(() => {
    getVehicles(
      {
        url: `http://localhost:3000/store/vehicle/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      setVehicleData.bind(null)
    );
  }, [getVehicles]);

  let content = <ErrorMessage errorText='No Vehicle for today :(' />;

  if (vehicleDetails) {
    content = (
      <>
        <div >
          <h3>Details</h3>
          <div>
            <h4>Name</h4>
            <span> {vehicleDetails.title}</span>
          </div>
          <div>
            <h4>Model</h4>
            <span> {vehicleDetails.manufacture}</span>
          </div>
          <div>
            <h4>Year</h4>
            <span> {vehicleDetails.year}</span>
          </div>
          <div>
            <h4>Type</h4>
            <span>{vehicleDetails.type}</span>
          </div>
          <div>
            <h4>Price per day</h4>
            <span>{vehicleDetails.price} LE</span>
          </div>
          <div>
            <h4>Rental info</h4>
            <span>{vehicleDetails.rentalInfo} </span>
          </div>
          <div>
            <h4>Description</h4>
            <span>{vehicleDetails.description} </span>
          </div>
        </div>
        <div >
          <img src={vehicleDetails.imgURL[0]} alt='' width={400} height={400} />
        </div>
      </>
    );
  }
  return <div className={classes.vehicleDesc}>{content}</div>;
};

export default VehicleDesc;
