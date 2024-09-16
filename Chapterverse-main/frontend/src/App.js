import React, { useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Routes, Route } from "react-router-dom";
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Bookdetails from './components/Bookdetails/Bookdetails';
import Favourites from './components/Profile/Favourites'; // Make sure this import is correct
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import OrderHistory from './components/Profile/OrderHistory';
import Settings from './components/Profile/Settings';
import AllOrders from './pages/AllOrders';
import AddBook from './pages/AddBook';
import Updatebook from './pages/Updatebook';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (localStorage.getItem("id") &&
        localStorage.getItem("token") &&
        localStorage.getItem("role")) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/profile" element={<Profile />}>
          {role ==="user" ? <Route index element={<Favourites />} /> : <Route index element={<AllOrders/>} />}
          {role ==="admin" &&  <Route path="/profile/add-book" element={<AddBook />} />}
          
          <Route path="/profile/orderHistory" element={<OrderHistory />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>
        <Route path="/book-details/:id" element={<Bookdetails />} />
        <Route path="/updateBook/:id" element={<Updatebook />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
