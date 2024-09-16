import React from 'react';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <div className='h-auto lg:h-[75vh] flex flex-col lg:flex-row'>
      <div className='w-full lg:w-3/6 flex flex-col justify-center p-4'>
        <div className='py-4 mt-12'>
          <h1 className='text-4xl lg:text-6xl font-bold text-[#032B37]'>
            Today A&nbsp;
            <span className='text-[#086D8A]'>Reader,</span>
          </h1>
        </div>
        <div>
          <h1 className='text-4xl lg:text-6xl font-bold text-[#032B37]'>
            Tomorrow A&nbsp;
            <span className='text-[#086D8A]'>Leader</span>
          </h1>
        </div>
        <div>
          <p className='text-lg lg:text-xl text-gray-500 mt-8 font-medium'>
            Find your next great read from our extensive collection of books across all genres. Join our community of book lovers and start your reading journey today!
          </p>
        </div>
        <div className='mt-8'>
          <Link to = "/all-books" className='bg-[#086D8A] text-white text-lg font-semibold py-2 px-8 rounded hover:bg-[#065b70]'>
            Discover Books
          </Link>
        </div>
        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex items-center'>
            <span className='text-green-500 mr-2'>✔️</span>
            <span className='text-gray-500 font-medium'>Wide range of genres</span>
          </div>
          <div className='flex items-center'>
            <span className='text-green-500 mr-2'>✔️</span>
            <span className='text-gray-500 font-medium'>Affordable prices</span>
          </div>
          <div className='flex items-center'>
            <span className='text-green-500 mr-2'>✔️</span>
            <span className='text-gray-500 font-medium'>Exclusive collections</span>
          </div>
          <div className='flex items-center'>
            <span className='text-green-500 mr-2'>✔️</span>
            <span className='text-gray-500 font-medium'>Fast shipping</span>
          </div>
        </div>
      </div>
      <div className='w-full lg:w-3/6 flex justify-center items-center mt-8 lg:mt-0 h-auto lg:h-[100%]'>
        <img className='max-w-full max-h-[30vh] lg:max-h-full' src="./OBJECTS.svg" alt="Illustration" />
      </div>
    </div>
  )
}

export default Hero;
