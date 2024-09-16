import axios from 'axios';
import React, { useState } from 'react'

const AddBook = () => {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    });
    const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
      };
    const change =(e) =>{
        const {name,value} = e.target;
        setData({...Data,[name]:value});
    };
    const submit = async ()=>{
        try{
            if(
                Data.url ===""||
                Data.title ==="" ||
                Data.author ==="" ||
                Data.price ==="" ||
                Data.desc ==="" ||
                Data.language ===""
            ){
                alert("All fields are required");
            }else{
                const response = await axios.post(
                    "https://chapterverse1.onrender.com/api/v1/add-book",
                    Data,
                    {headers}
                );
                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    desc: "",
                    language: "",
                });
                alert(response.data.message);
            }
        }
        catch(error){
            alert(error.response.data.message);
        }
    };
  return (
    <div className='h-[100%] p-0 md:p-4'>
        <h1 className='text-3xl md:text-5xl font-semibold text-[#086D8A] mb-8'>Add Book</h1>
        <div className='p-4 bg-white rounded'>
            <div>
                <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>
                    Image
                </label>
                <input 
                type="text"
                className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
                placeholder='url of image'
                name="url"
                required
                vlaue={Data.url}
                onChange={change}
                />
            </div>
            <div className='mt-6'>
            <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>
                    Title of Book
                </label>
                <input 
                type="text"
                className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
                placeholder='title of book'
                name="title"
                required
                vlaue={Data.title}
                onChange={change}
                />
            </div>
            <div className='mt-6'>
            <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>
                    Author of Book
                </label>
                <input 
                type="text"
                className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
                placeholder='author of book'
                name="author"
                required
                value={Data.author}
                onChange={change}
                />
            </div>
            <div className='mt-6 flex gap-4'>
                <div className='w-3/6'>
                <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>
                    Language
                </label>
                <input 
                type="text"
                className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
                placeholder='language of book'
                name="language"
                required
                value={Data.language}
                onChange={change}
                />
                </div>
                <div className='w-3/6'>
                <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>
                    Price
                </label>
                <input 
                type="number"
                className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
                placeholder='price of book'
                name="price"
                required
                value={Data.price}
                onChange={change}
                />
                </div>
            </div>
            <div className='mt-6'>
            <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>
                Description of Book
                </label>
                <textarea
                className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
                rows="5"
                placeholder='description of book'
                name="desc"
                required
                value={Data.desc}
                onChange={change}
                />
            </div>
            <button className='mt-6 px-3 bg-[#086D8A] text-white font-semibold py-2 rounded hover:bg-[#075A71]'
            onClick={submit}
            >
                Add Book
            </button>
        </div>
    </div>
  )
}

export default AddBook