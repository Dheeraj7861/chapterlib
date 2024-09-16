import axios from 'axios';
import React, { useEffect,useState } from 'react'
import Loader from '../Loader/Loader';

const Settings = () => {
  const [Value, setValue] = useState({address:""});
  const [ProfileData, setProfileData] = useState()
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  const change =(e) =>{
    const {name,value} = e.target;
    setValue({...Value,[name]:value})
  }
  useEffect(()=>{
    const fetch = async ()=>{
      const response = await axios.get("https://chapterverse1.onrender.com/api/v1/get-user-info",{headers});
      setProfileData(response.data);
      setValue({address: response.data.address});
    };
    fetch();
  },[]);
  const submitAddress = async ()=>{
    const response = await axios.put("https://chapterverse1.onrender.com/api/v1/update-address",Value,{headers});
    alert(response.data.message);
  };
  return(
    <>
    {!ProfileData && (
      <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>)}{" "}
    {ProfileData && (
      <div className='h-[100%] p-0 md:p-4 text-[#086D8A]'>
        <h1 className='text-3xl md:text-5xl font-semibold text-[#086D8A] mb-8'>
          Settings
        </h1>
        <div className='flex gap-12'>
          <div className=''>
            <label htmlFor="Username">Username</label>
            <p className='p-2 rounded bg-white mt-2 font-semibold'>{ProfileData.username}</p>
          </div>
          <div className=''>
            <label htmlFor="">Email</label>
            <p className='p-2 rounded bg-white mt-2 font-semibold'>{ProfileData.email}</p>
          </div>
        </div>
        <div className='mt-4 flex flex-col'>
          <label htmlFor="">Address</label>
          <textarea
          className='p-2 rounded bg-white mt-2 font-semibold'
          rows="5"
          placeholder='Address'
          name="address" 
          value={Value.address}
          onChange={change}/>
        </div>
        <div className='mt-4 flex justify-end'>
          <button className='bg-yellow-500 text-[#086D8A] font-semibold px-3 py-2 rounded' onClick={submitAddress}>Update</button>
        </div>
      </div>
    )}
    </>
  )
}

export default Settings