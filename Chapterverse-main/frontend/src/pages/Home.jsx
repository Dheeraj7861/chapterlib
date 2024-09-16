import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'
import AllBooks from './AllBooks'

const Home = () => {
  return (
    <div className='bg-[#F3F8F9] text-black px-24 py-8 ' >
        <Hero/>
        <RecentlyAdded/>
        <AllBooks/>
    </div>
  )
}

export default Home