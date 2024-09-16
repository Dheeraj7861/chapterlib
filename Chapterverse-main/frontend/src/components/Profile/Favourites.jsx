import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Bookcard from '../Bookcard/Bookcard';

const Favourites = () => {
  const [favouritebooks, setfavouritebooks] = useState([]);
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('https://chapterverse1.onrender.com/api/v1/get-favourite-books', { headers });
      setfavouritebooks(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {favouritebooks.length === 0 && (
        <div className='text-4xl font-semibold text-[#086D8A]'>
          No Favourite Books
        </div>
      )}
      {favouritebooks.map((items, i) => (
        <div key={i}>
          <Bookcard data={items} favourite={true} />
        </div>
      ))}
    </div>
  );
};

export default Favourites;
