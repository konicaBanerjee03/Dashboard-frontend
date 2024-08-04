import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OrdersPage: React.FC = () => {
  const { setToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error: any) {
        console.error('Error fetching orders data', error);
        if (error.response.status === 401) {
          setToken(null);
          navigate('/signin');
        }
      }
    };
    fetchData();
  }, [setToken, navigate]);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Click ID</th>
              <th className="px-4 py-2">Merchant</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.click_id}</td>
                <td className="border px-4 py-2">{order.clickDetails.merchant}</td>
                <td className="border px-4 py-2">{order.clickDetails.product}</td>
                <td className="border px-4 py-2">{order.clickDetails.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
};

export default OrdersPage;
