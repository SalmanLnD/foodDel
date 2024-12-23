import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home/Home";
import Cart from "./screens/Cart/Cart";
import MyOrders from "./screens/MyOrders/MyOrders";
import PlaceOrder from "./screens/PlaceOrder/PlaceOrder";
import Verify from "./screens/Verify/Verify";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [showLogin, setShowLogin] = React.useState(false);
  return (
    <>
      {
        showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>
      }
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/myorders" element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
