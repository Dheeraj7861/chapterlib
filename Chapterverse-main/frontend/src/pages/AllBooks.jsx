import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bookcard from '../components/Bookcard/Bookcard'
import Loader from '../components/Loader/Loader'
const AllBooks = () => {
  const [Data, setData] = useState([]); // Ensure the state is an empty array initially
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://chapterverse1.onrender.com/api/v1/get-all-books');
        console.log('Fetched data:', response.data.data); // Log the fetched data
        setData(response.data.data); // Update the state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
      }
    };

    fetchBooks();
  }, []);
  return (
    <div className='px-4 py-8  bg-[#F3F8F9]'>
      <h4 className='text-4xl font-medium text-[#032B37]'>All Books</h4>
      {!Data && 
        <div className='flex items-center justify-center my-8'>
            <Loader/>
        </div>
      }
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {Data && Data.map((item, index) => (
          <div key={index}>
            <Bookcard data={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllBooks