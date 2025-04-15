import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FaShoppingCart, 
  FaHeart, 
  FaRegHeart, 
  FaUtensils, 
  FaStar, 
  FaArrowLeft, 
  FaTag, 
  FaBoxOpen,
  FaShippingFast
} from "react-icons/fa";

function Item() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [status, setStatus] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://food-backend-1-xjm3.onrender.com/get-item", { params: { id } });
      setData([res.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching item:", error);
      setLoading(false);
    }
  };

  const handleCart = async (id) => {
    try {
      const res = await axios.post("https://food-backend-1-xjm3.onrender.com/add-to-cart", {
        id,
        username: localStorage.getItem("username"),
        quantity
      });
      if (res) {
        setRender((prev) => !prev);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleFavorite = async () => {
    try {
      const res = await axios.post("https://food-backend-1-xjm3.onrender.com/add-fav", {
        ...data[0],
        username: localStorage.getItem('username')
      });
      if (res.data) {
        setRender(prev => !prev);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  async function getStatus() {
    try {
      const res = await axios.get('https://food-backend-1-xjm3.onrender.com/get-status', {
        params: { username: localStorage.getItem('username') }
      });
      setStatus(res.data);
    } catch (error) {
      console.error("Error getting status:", error);
    }
  }

  useEffect(() => {
    getData();
    getStatus();
  }, [render]);

  const incrementQuantity = () => {
    if (data[0] && quantity < data[0].quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="animate-spin h-12 w-12 border-t-4 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <div className="max-w-4xl mx-auto mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-blue-700 hover:text-blue-900 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to listings
        </button>
      </div>
      
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800 border-b-4 border-blue-500 inline-block pb-2">
          Item Details
        </h1>
      </div>

      {data.map((ele) => (
        <div key={ele._id} className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden border border-blue-300 transition-transform hover:scale-101">
          <div className="relative">
            <img className="w-full h-80 object-cover" src={ele.file} alt={ele.name} />
            {ele.quantity <= 5 && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                <FaBoxOpen className="mr-1" /> Only {ele.quantity} left!
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold text-blue-700">{ele.name}</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <FaTag className="mr-1" /> {ele.category}
              </span>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-lg font-medium flex items-center">
                  <span className="text-blue-600 text-xl mr-2">₹{ele.price}</span>
                  <span className="text-gray-500 text-sm line-through">₹{Math.round(ele.price * 1.2)}</span>
                </p>
                <p className="text-green-600 text-sm">20% off</p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-gray-700">
                  <FaShippingFast className="inline mr-2 text-blue-600" />
                  Free delivery available
                </p>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Select Quantity:</h3>
              <div className="flex items-center">
                <button 
                  onClick={decrementQuantity} 
                  className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-800 rounded-l-md border border-blue-300"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-12 h-8 flex items-center justify-center border-t border-b border-blue-300 bg-white">
                  {quantity}
                </span>
                <button 
                  onClick={incrementQuantity} 
                  className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-800 rounded-r-md border border-blue-300"
                  disabled={data[0] && quantity >= data[0].quantity}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link to={`/main_home/order/${ele._id}`} className="bg-blue-700 text-white py-3 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors shadow-md">
                <FaUtensils /> Order Now
              </Link>

              {ele.cart_status === "added" ? (
                <div className="bg-green-100 text-green-700 py-3 px-4 rounded-md flex items-center justify-center gap-2 border border-green-400">
                  <FaShoppingCart /> Item added to cart
                </div>
              ) : (
                <button 
                  onClick={() => handleCart(ele._id)} 
                  className="border border-blue-700 text-blue-700 py-3 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              )}

              <div className="flex justify-between mt-4 border-t border-gray-200 pt-4">
                <Link to={`/main_home/reviews/${ele._id}`} className="text-blue-600 flex items-center gap-1 hover:underline transition-colors py-2">
                  <FaStar className="text-yellow-500" /> View Reviews
                </Link>
                {Array.isArray(status) && status.includes(ele.name) ? (
                  <span className="text-red-600 flex items-center gap-1 py-2">
                    <FaHeart /> Added to Favorites
                  </span>
                ) : (
                  <button 
                    onClick={handleFavorite} 
                    className="text-blue-600 flex items-center gap-1 hover:text-red-600 transition-colors py-2"
                  >
                    <FaRegHeart /> Add to Favorites
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Item;