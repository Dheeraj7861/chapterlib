import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from 'react-icons/fa';
import {useSelector} from "react-redux";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: 'Home', link: '/' },
    { title: 'All Books', link: '/all-books' },
    { title: 'Cart', link: '/cart' },
    { title: 'Profile', link: '/profile' },
    { title: 'Admin Profile', link: '/profile' },
  ];

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const role = useSelector((state)=>state.auth.role);
  
  if(isLoggedIn == false){
    links.splice(2,2);
  }
  if(isLoggedIn== true && role ==="admin"){
    links.splice(3,1);
  }
  if(isLoggedIn== true && role ==="user"){
    links.splice(4,1);
  }
  return (
    <div className='bg-[#F3F8F9] text-grey px-4 md:px-24 py-4'>
      <div className='flex items-center justify-between'>
        <Link to='/' className='flex items-center'>
          <img className='h-10 me-4' src='https://www.svgrepo.com/show/53217/book-and-glasses.svg' alt='logo' />
          <h1 className='text-2xl font-semibold text-[#086D8A]'>
            Chapter<span className='text-[#032B37]'>Verse</span>
          </h1>
        </Link>
        <button
          className='md:hidden text-gray-500 text-2xl ml-4 mt-1'
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaGripLines />
        </button>
      </div>

      <div
        className={`flex-col md:flex md:flex-row md:items-center w-full md:w-auto ${isOpen ? 'flex' : 'hidden'}`}
      >
        <div className='flex flex-col md:flex-row md:gap-16 pt-2 text-gray-500 justify-center w-full md:w-auto'>
          {links.map((items, i) => (
            <Link to={items.link} key={i} className='px-4 py-2 md:px-0 nav-link'>
              {items.title}
            </Link>
          ))}
        </div>

        {isLoggedIn === false && <div className='flex flex-col md:flex-row gap-4 md:gap-8 mt-4 md:mt-0 md:ml-auto'>
          <Link to='/Login' className='px-4 py-2 text-[#086D8A] hover:text-[#075A71]'>
            LogIn
          </Link>
          <Link to='/SignUp' className='px-4 py-2 bg-[#086D8A] text-white border rounded-lg hover:bg-[#075A71]'>
            SignUp
          </Link>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
