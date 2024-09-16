import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bookcard from '../Bookcard/Bookcard';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {
  const [Data, setData] = useState([]); // Ensure the state is an empty array initially

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://chapterverse1.onrender.com/api/v1/get-recent-books');
        console.log('Fetched data:', response.data.data); // Log the fetched data
        setData(response.data.data); // Update the state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
      }
    };

    fetchBooks();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className='mt-16 px-4 '>
      <h4 className='text-4xl font-medium text-[#032B37]'>Recently Added books</h4>
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
  );
};

export default RecentlyAdded;
