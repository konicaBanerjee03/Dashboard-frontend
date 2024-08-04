import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { setToken } = useAuth();
  const [data, setData] = useState({ clicks: 0, orders: 0, amount: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard');
        setData(response.data);
      } catch (error: any) {
        console.error('Error fetching dashboard data', error);
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
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="mb-4">Clicks: {data.clicks === 0 ? 'No clicks yet' : data.clicks}</div>
      <div className="mb-4">Orders: {data.orders === 0 ? 'No orders yet' : data.orders}</div>
      <div className="mb-4">Amount: {data.amount === 0 ? 'No amount yet' : `$${data.amount}`}</div>
    </div>
  );
};

export default DashboardPage;
