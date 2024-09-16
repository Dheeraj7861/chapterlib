import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Updatebook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const { id } = useParams();
  const navigate = useNavigate(); // Add navigate to redirect after update

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        console.log("entered")
        const response = await axios.put(
          "https://chapterverse1.onrender.com/api/v1/update-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        console.log(response);
        alert(response.data.message);
        navigate(`/book-details/${id}`);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://chapterverse1.onrender.com/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <div className='h-[100%] p-0 md:px-24 md:py-4'>
      <h1 className='text-3xl md:text-5xl font-semibold text-[#086D8A] mb-8'>Update Book</h1>
      <div className='p-4 bg-white rounded'>
        <div>
          <label htmlFor="url" className='text-[#086D8A] text-xl font-medium'>Image</label>
          <input
            type="text"
            className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
            placeholder='url of image'
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className='mt-6'>
          <label htmlFor="title" className='text-[#086D8A] text-xl font-medium'>Title of Book</label>
          <input
            type="text"
            className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
            placeholder='title of book'
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className='mt-6'>
          <label htmlFor="author" className='text-[#086D8A] text-xl font-medium'>Author of Book</label>
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
            <label htmlFor="language" className='text-[#086D8A] text-xl font-medium'>Language</label>
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
            <label htmlFor="price" className='text-[#086D8A] text-xl font-medium'>Price</label>
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
          <label htmlFor="desc" className='text-[#086D8A] text-xl font-medium'>Description of Book</label>
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
        <button
          className='mt-6 px-3 bg-[#086D8A] text-white font-semibold py-2 rounded hover:bg-[#075A71]'
          onClick={submit}
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default Updatebook;
