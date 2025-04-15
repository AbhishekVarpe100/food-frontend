import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// Import icons from react-icons library
import { FaSearch, FaChevronDown, FaUtensils } from "react-icons/fa";
import { MdRestaurantMenu, MdDinnerDining } from "react-icons/md";
import { TbChefHat } from "react-icons/tb";
import { IoMdWine } from "react-icons/io";
import { BsArrowRight, BsBookHalf } from "react-icons/bs";

function Available_Items() {
  const [data, setData] = useState([]);
  const [option, setOption] = useState("");
  const [searchText, setSearchText] = useState("");

  async function getData() {
    const res = await axios.get("https://food-backend-1-xjm3.onrender.com/get-data-cust");
    setData(res.data);
  }

  const handleOption = async (e) => {
    const option = e.target.value;
    setOption(option);
    const res = await axios.get("https://food-backend-1-xjm3.onrender.com/order-by", {
      params: { option },
    });
    if (res.data) setData(res.data);
  };

  const handleSearch = async (e) => {
    const text = e.target.value;
    setSearchText(text);
    
    const res = await axios.get("https://food-backend-1-xjm3.onrender.com/search-item", {
      params: { searchText: text },
    });
    if (res.data) setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 font-serif">
      {/* Enhanced Classic Header with ornate elements */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-10 px-4 shadow-md relative overflow-hidden">
        {/* Decorative background patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-4">
            {/* Ornate icon */}
            <div className="inline-block p-4 rounded-full bg-blue-800 border-4 border-blue-700 shadow-inner">
              <MdDinnerDining className="w-12 h-12 mx-auto text-blue-200" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-3">The Royal Table</h1>
          
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-16 bg-blue-300"></div>
            <IoMdWine className="text-blue-300 w-5 h-5" />
            <div className="h-px w-16 bg-blue-300"></div>
          </div>
          
          <p className="text-blue-200 italic text-lg">Fine cuisine for distinguished tastes</p>
          
          {/* Ornate border bottom */}
          <div className="pt-6 flex justify-center">
            <div className="w-48 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Enhanced classic search and filter controls */}
        <div className="mb-8 md:mb-10 bg-white border-2 border-blue-200 rounded-lg shadow-md p-4 md:p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700"></div>
          
          {/* Classic ornate corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-700 rounded-tl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-700 rounded-tr"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-700 rounded-bl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-700 rounded-br"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 relative z-10">
            <div className="w-full">
              <label className="block text-blue-800 font-semibold mb-2 text-sm flex items-center">
                <MdRestaurantMenu className="mr-2" /> Browse Our Menu
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={handleSearch}
                  placeholder="Search dishes..."
                  className="w-full border-2 border-blue-200 rounded-lg py-2 px-4 pl-10 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
              </div>
            </div>

            <div className="w-full mt-4 md:mt-0">
              <label className="block text-blue-800 font-semibold mb-2 text-sm flex items-center">
                <TbChefHat className="mr-2" /> Arrange By
              </label>
              <div className="relative">
                <select
                  value={option}
                  onChange={handleOption}
                  className="w-full appearance-none bg-white border-2 border-blue-200 rounded-lg py-2 px-4 text-blue-800 font-serif focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Dishes</option>
                  <option value="veg">By Veg Items</option>
                  <option value="non-veg">By Non-Veg Items</option>
                  <option value="price">By Price</option>
                  <option value="quantity">By Availability</option>
                  <option value="name">Alphabetically</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
                  <FaChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative background element */}
          <div className="absolute -bottom-4 -right-4 opacity-5">
            <FaUtensils className="w-20 h-20 text-blue-900" />
          </div>
        </div>

        {/* Food item cards with enhanced classic theme */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {data.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link to={`/main_home/${item._id}`} className="block">
                  <div className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-blue-100 relative">
                    {/* Decorative classic header bar */}
                    <div className="absolute inset-x-0 top-0 h-2 bg-blue-800 opacity-75"></div>
                    
                    {/* Image container with elegant frame */}
                    <div className="relative pt-6 px-4">
                      <div className="relative rounded-lg overflow-hidden border-2 border-blue-200">
                        {/* Elegant corner accents */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-700 rounded-tl"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-700 rounded-tr"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-700 rounded-bl"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-700 rounded-br"></div>
                        
                        {/* Stock indicator with react icons */}
                        {item.quantity <= 5 ? (
                          <div className="absolute top-2 right-2 z-10 bg-red-100 border border-red-500 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                            Only {item.quantity} left!
                          </div>
                        ) : (
                          <div className="absolute top-2 right-2 z-10 bg-blue-100 border border-blue-500 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                            {item.quantity} available
                          </div>
                        )}
                        
                        <img
                          src={item.file}
                          alt={item.name}
                          className="w-full h-40 md:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    
                    {/* Content with elegant typography */}
                    <div className="p-4 pt-3">
                      <div className="flex items-center justify-center mb-2">
                        <div className="h-px w-8 bg-blue-200"></div>
                        <div className="px-3">
                          <div className="w-3 h-3 bg-blue-500 rotate-45"></div>
                        </div>
                        <div className="h-px w-8 bg-blue-200"></div>
                      </div>
                      
                      <h2 className="text-center text-lg md:text-xl font-bold text-blue-900 mb-1">{item.name}</h2>
                      
                      {/* Classic style category label */}
                      <div className="text-center">
                        <span className="inline-block px-3 py-1 text-xs text-blue-600 italic">
                          {item.category}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                          <span className="font-medium text-blue-800">{item.price} Rs.</span>
                        </div>
                        
                        <div className="text-blue-600 group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                          <span className="font-serif italic text-sm mr-1">Details</span>
                          <BsArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 md:p-10 bg-white border-2 border-blue-200 rounded-lg">
            <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
              <BsBookHalf className="w-10 h-10 text-blue-500" />
            </div>
            <h6 className="font-serif text-xl text-blue-800 font-semibold">
              Our Menu is Being Prepared
            </h6>
            <p className="text-blue-600 mt-2">Please check back soon for our delightful offerings.</p>
          </div>
        )}
      </div>
      
      {/* Enhanced classic footer */}
      <div className="mt-16 border-t-2 border-blue-200 py-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto text-center px-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 md:w-12 bg-blue-300"></div>
            <FaUtensils className="w-4 h-4 text-blue-500" />
            <div className="h-px w-8 md:w-12 bg-blue-300"></div>
          </div>
          <p className="text-blue-700 italic text-sm font-medium">
            "One cannot think well, love well, sleep well, if one has not dined well."
          </p>
          <p className="text-blue-500 text-xs mt-1">— Virginia Woolf</p>
          
          {/* Classic ornamental footer */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center">
              <div className="h-px w-16 bg-blue-200"></div>
              <div className="mx-2 text-blue-300 text-xl">❦</div>
              <div className="h-px w-16 bg-blue-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Available_Items;