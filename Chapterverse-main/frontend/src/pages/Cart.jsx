import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await axios.get(
          "https://chapterverse1.onrender.com/api/v1/get-user-cart", { headers }
        );
        setCart(res.data.data);
        let total = 0;
        res.data.data.forEach(item => {
          total += item.price;
        });
        setTotal(total);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setIsLoading(false);
      }
    };
    fetchCartData();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `https://chapterverse1.onrender.com/api/v1/remove-from-cart/${bookid}`, {}, { headers }
      );
      alert(response.data.message);
      setCart(Cart.filter(item => item._id !== bookid));
      setTotal(Total - Cart.find(item => item._id === bookid).price);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        `https://chapterverse1.onrender.com/api/v1/place-order`,
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/Profile/OrderHistory");
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <div className='bg-[#F3F8F9] px-12 py-8 min-h-screen'>
      {isLoading && <Loader />}
      {!isLoading && Cart.length === 0 && (
        <div className='h-screen flex items-center justify-center flex-col'>
          <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>Empty Cart</h1>
          <img src="https://www.eghoaf.com/assets/themes/egho-af/zonan/img/empty-cart.png" alt="Empty Cart" className='lg:h-[50vh]' />
        </div>
      )}
      {!isLoading && Cart.length > 0 && (
        <div>
          <h1 className='text-3xl font-semibold text-[#086D8A] mb-4'>Your Cart</h1>
          {Cart.map((item, index) => (
            <div key={index} className='w-full my-4 rounded p-4 bg-white border border-[#086D8A] flex flex-col md:flex-row items-center'>
              <img src={item.url} alt={item.title} className='h-[20vh] md:h-[10vh] object-cover mb-4 md:mb-0 md:mr-4' />
              <div className='flex-1'>
                <h1 className='text-2xl text-[#086D8A] font-semibold mt-2'>{item.title}</h1>
                <p className='text-normal text-zinc-700 mt-2'>
                  {item.desc.slice(0, 100)}...
                </p>
                <p className='text-[#032B37] text-3xl font-semibold mt-4 flex items-center'>
                  <FaIndianRupeeSign className='mr-1' /> {item.price}
                </p>
              </div>
              <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 mt-4 md:mt-0 md:ml-4'
                onClick={() => deleteItem(item._id)}
              >
                <AiFillDelete />
              </button>
            </div>
          ))}
          <div className='mt-4'>
            <div className='bg-white rounded p-4'>
              <h1 className='text-3xl text-[#032B37] font-semibold'>Total Amount</h1>
              <div className='mt-3 flex items-center justify-between text-xl text-[#086D8A]'>
                <h2>{Cart.length} books</h2>
                <h2>
                  <FaIndianRupeeSign className='' /> {Total}
                </h2>
              </div>
              <div className='mt-3'>
                <button className='bg-[#086D8A] text-white rounded px-4 py-2 w-full text-center font-semibold'
                  onClick={PlaceOrder}
                >
                  Place Your Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
