import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaHeart, FaRegHeart, FaUtensils, FaStar } from "react-icons/fa";

function Item() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [status, setStatus] = useState([]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <div className="animate-spin h-12 w-12 border-t-4 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800 border-b-4 border-blue-500 inline-block pb-2">Item Details</h1>
      </div>

      {data.map((ele) => (
        <div key={ele._id} className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-blue-300">
          <img className="w-full h-64 object-cover" src={ele.file} alt={ele.name} />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-blue-700 border-b-2 pb-2">{ele.name}</h2>
            <div className="mt-4 space-y-2">
              <p className="text-lg font-medium">Price: <span className="text-blue-600">{ele.price} Rs.</span></p>
              <p className="text-lg font-medium">Quantity: <span className="text-blue-600">{ele.quantity} Items</span></p>
              <p className="text-lg font-medium">Category: <span className="text-blue-600">{ele.category} Items</span></p>
            </div>

            {ele.quantity <= 5 && (
              <p className="mt-2 text-red-600 font-medium">Hurry up! Limited quantity left.</p>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <Link to={`/main_home/order/${ele._id}`} className="bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-blue-800">
                <FaUtensils /> Order Now
              </Link>

              {ele.cart_status === "added" ? (
                <div className="bg-green-100 text-green-700 py-2 px-4 rounded-md flex items-center justify-center gap-2 border border-green-400">
                  <FaShoppingCart /> Item added to cart
                </div>
              ) : (
                <button onClick={() => handleCart(ele._id)} className="border border-blue-700 text-blue-700 py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-blue-100">
                  <FaShoppingCart /> Add to Cart
                </button>
              )}

              <div className="flex justify-between mt-2">
                <Link to={`/main_home/reviews/${ele._id}`} className="text-blue-600 flex items-center gap-1 hover:underline">
                  <FaStar /> View Reviews
                </Link>
                {Array.isArray(status) && status.includes(ele.name) ? (
                  <span className="text-red-600 flex items-center gap-1">
                    <FaHeart /> Added to Favorite
                  </span>
                ) : (
                  <button onClick={handleFavorite} className="text-blue-600 flex items-center gap-1 hover:underline">
                    <FaRegHeart /> Add to Favorite
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
