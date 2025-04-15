import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FiMinus, FiPlus, FiShoppingBag, FiUser, FiPhone, FiHome, FiPackage, FiDollarSign } from 'react-icons/fi';
import notificationSound from './notification_sound.mp3';

function OrderPanel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [name_, setName] = useState('');
  const [num, setNum] = useState('');
  const [addr, setAddr] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [rsp, setRsp] = useState(false);
  const [ui_, setUi] = useState(false);
  const [price, setPrice] = useState(0);
  const [playAudio, setPlayAudio] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://food-backend-1-xjm3.onrender.com/get-item', { params: { id } });
        setData(res.data);
        // Initialize price with default quantity of 1
        if (res.data.price) {
          setPrice(Number.parseInt(res.data.price));
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    getData();
  }, [id]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle quantity increment
  const handleIncrement = () => {
    if (data.quantity && quantity < Number.parseInt(data.quantity)) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      setPrice(Number.parseInt(data.price) * newQuantity);
    }
  };

  // Handle quantity decrement
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setPrice(Number.parseInt(data.price) * newQuantity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRsp(true);

    if (Number.parseInt(quantity) > Number.parseInt(data.quantity)) {
      alert(`Quantity should not be greater than available quantity of ${data.quantity}`);
      setRsp(false);
      return;
    }

    const item = {
      name: name_,
      phone: num,
      address: addr,
      item: data.name,
      price: price,
      quantity: quantity,
      av_quantity: data.quantity,
      username: localStorage.getItem('username'),
      file: data.file,
    };

    try {
      const res = await axios.post('https://food-backend-1-xjm3.onrender.com/confirm-order', item);
      if (res.data) {
        localStorage.setItem('orderData', JSON.stringify({ 
          name: name_, 
          phone: num, 
          item: data.name, 
          price, 
          quantity, 
          av_quantity: data.quantity, 
          address: addr, 
          file: data.file 
        }));

        alert("Order confirmed. Proceed to Payment.");
        setUi(true);
      }
    } catch (error) {
      console.error("Error confirming order:", error);
    }
    setRsp(false);
  };
  
  const handleCashOnDelivery = async () => {
    const res = await axios.post('https://food-backend-1-xjm3.onrender.com/handle-cash-on-delivery', {
      item: localStorage.getItem('orderData')
    });
    if (res.data) {
      navigate('/main_home');
    }
  };

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("https://food-backend-1-xjm3.onrender.com/create-order", { 
        price: price,
        orderData: localStorage.getItem('orderData')
      });
      const isScriptLoaded = await loadRazorpayScript();

      if (!isScriptLoaded) {
        alert('Failed to load Razorpay script. Please try again.');
        return;
      }

      const options = {
        key: "rzp_test_mzNTcsoUKTuELO",  // Your Razorpay Test Key
        amount: price, // Price in paise
        currency: "INR",
        name: "FoodOrdering Service",
        description: "Test Transaction",
        order_id: data.order.id,
        handler: function (response) {
          const audio = new Audio(notificationSound);
          audio.play();
          navigate('/main_home');
        },
        theme: { color: "#1976D2" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {ui_ ? (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center mb-4">Select Payment Method</h2>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center"
          >
            <FiDollarSign className="mr-2" />
            {rsp ? "Processing..." : `Pay Now ₹${price || data.price}`}
          </button>
          <button 
            onClick={handleCashOnDelivery}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition flex items-center justify-center"
          >
            <FiHome className="mr-2" />
            Cash on Delivery
          </button>
        </div>
      ) : (
        data.quantity > 0 ? (
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800 flex items-center justify-center">
              <FiShoppingBag className="mr-3 text-green-600" />
              Order Information
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  required
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter name"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="text-gray-400" />
                </div>
                <input
                  required
                  onChange={(e) => setNum(e.target.value)}
                  type="text"
                  placeholder="Enter mobile number"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiHome className="text-gray-400" />
                </div>
                <input
                  required
                  onChange={(e) => setAddr(e.target.value)}
                  type="text"
                  placeholder="Enter home address"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPackage className="text-gray-400" />
                </div>
                <input
                  value={data.name}
                  disabled
                  type="text"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  value={`₹${price || data.price}`}
                  disabled
                  type="text"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                />
              </div>
              
              {/* Quantity selector with + and - icons */}
              <div className="flex items-center">
                <label className="text-gray-700 mr-4">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button 
                    type="button" 
                    onClick={handleDecrement}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 focus:outline-none transition"
                  >
                    <FiMinus />
                  </button>
                  <div className="px-4 py-2 text-center min-w-[60px]">
                    {quantity}
                  </div>
                  <button 
                    type="button" 
                    onClick={handleIncrement}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 focus:outline-none transition"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
              
              <div className="text-gray-600 flex items-center">
                <FiPackage className="mr-2 text-green-600" />
                Available Quantity: {data.quantity}
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition flex items-center justify-center"
              >
                <FiShoppingBag className="mr-2" />
                {rsp ? "Processing..." : "Confirm Order"}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-red-100 text-red-800 border border-red-400 rounded-lg p-6 text-center mt-4 max-w-md w-full">
            <FiPackage className="mx-auto text-red-600 text-3xl mb-2" />
            <p className="font-semibold text-lg">Sorry! Item is not available.</p>
            <p>It will be available soon!</p>
          </div>
        )
      )}
    </div>
  );
}

export default OrderPanel;