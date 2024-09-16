import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get("https://chapterverse1.onrender.com/api/v1/get-order-history", { headers });
        setOrderHistory(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching order history:', error);
        setError('Failed to fetch order history. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchOrderHistory();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (orderHistory.length === 0) {
    return (
      <div className='h-[80vh] p-4 text-zinc-800'>
        <div className='h-[100%] flex flex-col items-center justify-center'>
          <h1 className='text-5xl font-semibold text-zinc-800 mb-8'>No Order History</h1>
          <img src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1233.jpg?t=st=1721847516~exp=1721851116~hmac=f2ac5097fe70413ffbb36ed6fb0c2d6766902a2d0bdf6891694b29b052b0bd6d&w=740" alt="" className='h-[20vh] mb-8' />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#F3F8F9] min-h-screen">
      <h1 className="text-3xl font-semibold text-[#086D8A] mb-4">Order History</h1>
      <div className="space-y-4">
        {orderHistory.map((order, index) => (
          <div key={index} className="p-4 bg-white rounded border border-[#086D8A]">
            <h2 className="text-xl font-semibold text-[#086D8A]">{order.book.title}</h2>
            <p className="text-zinc-700">{order.book.desc}</p>
            <p className="text-zinc-700">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-zinc-700">Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
