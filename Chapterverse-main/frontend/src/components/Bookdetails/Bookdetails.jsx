import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GrLanguage } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";

const Bookdetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // get the book id from the URL
  const [book, setBook] = useState(null);
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  const role= useSelector((state)=> state.auth.role);
  // console.log(isLoggedIn);
  // console.log(role);
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        console.log(id);
        const response = await axios.get(`https://chapterverse1.onrender.com/api/v1/get-book-by-id/${id}`);
        console.log(response)
        setBook(response.data.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  // if (!book) {
  //   return <div>Loading...</div>;
  // }
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: id,
  };
  const handleFavourite = async ()=>{
    const response = await axios.put("https://chapterverse1.onrender.com/api/v1/add-book-to-favourites",{},{headers});
    alert(response.data.message);
  }
  const handleCart = async ()=>{
    const response = await axios.put("https://chapterverse1.onrender.com/api/v1/add-to-cart",{},{headers});
    alert(response.data.message);
  }
  const deletebook = async ()=>{
    const response = await axios.delete("https://chapterverse1.onrender.com/api/v1/delete-book",{headers});
    alert(response.data.message);
    navigate("/all-books")
  }
  
  return (
    <>
    {book && (<div className='px-4 py-4 bg-[#F3F8F9] flex md:flex-row flex-col gap-8'>
      <div className='relative bg-[#F3F8F9] p-4 lg:h-[88vh] h-[70vh] md:w-3/6 w-full flex items-center justify-center'>
        <img src={book.url} alt={book.title} className='lg:h-[70vh] h-[50vh]' />
        {isLoggedIn ===true && role === "user" && <button className='absolute top-4 right-4 bg-[#086D8A] rounded-full text-xl text-white p-3' onClick={handleFavourite}
        >
          <FaHeart />
        </button>}
        {isLoggedIn ===true && role === "admin" && <Link to={`/updateBook/${id}`} className='absolute top-4 right-4 bg-[#086D8A] rounded-full text-xl text-white p-3'>
          <MdEdit />
        </Link>}
      </div>
      <div className='p-4 w-full lg:w-3/6 bg-white'>
        <h1 className='text-4xl text-[#032B37] font-semibold'>{book.title}</h1>
        <p className="text-lg text-[#086D8A] mt-4 font-medium">by {book.author}</p>
        <p className='mt-8 text-[#032B37] text-3xl font-bold flex items-center'>
          <FaIndianRupeeSign className='' /> {book.price}{" "}
        </p>
        <p className="mt-8 text-gray-600">{book.desc}</p>
        <p className='flex mt-4 items-center justify-start text-zinc-600'>
          <GrLanguage className="mr-1" />{book.language}
        </p>
        {isLoggedIn ===true && role === "user" && <div className='mt-4 flex flex-row gap-4'>
          <button className='bg-[#086D8A] rounded text-xl p-3 text-white flex items-center hover:bg-[#075A71]' onClick={handleCart}>
            <FaShoppingCart className='mr-2' /> Add to Cart
          </button>
        </div>}
        {isLoggedIn ===true && role === "admin" && <div className='mt-4 flex flex-row gap-4'>
          <button className='bg-red-700 rounded text-xl p-3 text-white flex items-center hover:bg-red-800'
          onClick={deletebook}
          >
            <MdDelete  className='mr-2' /> Delete Book
          </button>
        </div>}
      </div>
    </div>
  )}
  {!book && 
   <div className='h-screen bg-[#F3F8F9] flex items-center justify-center'>
    <Loader/>
   </div>
  }
    </>
  );
};

export default Bookdetails;
