import { useEffect, useState, useContext } from 'react';

import useHttp from '../../hooks/use-http';

import { AuthContext } from '../../store/auth-context';

import ErrorMessage from '../ui/error-message/ErrorMessage';
import OrderItem from './order-item/OrderItem';

import classes from './Orders.module.css';

const Orders = () => {
  const [orderList, setOrderList] = useState([]);

  const { isLoadingOrders, error: errorRequestOrders, fetchData: getOrders } = useHttp();

  const { isLoading, error: errorRequest, fetchData: cancelOrder } = useHttp();

  const { userToken } = useContext(AuthContext);

  const setOrderData = (orderData) => {
    setOrderList(orderData);
  };

  useEffect(() => {
    getOrders(
      {
        url: 'http://localhost:3000/store/orders',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': userToken.token,
        },
      },
      setOrderData.bind(null)
    );
  }, []);

  const onCanelOrderHandler = (id) => {
    cancelOrder(
      {
        url: 'http://localhost:3000/store/cancel-order',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.token,
        },
        body: {
          orderId: id,
        },
      },
      setOrderData.bind(null)
    );
  }

  let content = <ErrorMessage errorText='No Orders for today :(' />;

  if (orderList.length > 0) {
    content = orderList.map((order) => (
      <OrderItem
        key={order.orderId._id}
        id={order.orderId._id}
        trackingDetails={order.orderId.trackingDetails}
        vehicle={order.orderId.vehicle}
        totalPrice={order.orderId.totalPrice}
        orderDate={order.orderId.orderDate}
        onCanel={onCanelOrderHandler}
      />
    ));
  }
  return <div className={classes.orders}>{content}</div>;
};

export default Orders;
