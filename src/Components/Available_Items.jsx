import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
      {/* Classic Header with blue theme */}
      <div className="bg-gradient-to-b from-blue-800 to-blue-700 text-white py-8 px-4 shadow-md">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-2">
            {/* Decorative fork and knife icon */}
            <svg className="w-12 h-12 mx-auto text-blue-200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M35,20 L35,80" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M25,25 C25,15 45,15 45,25 L45,35 L35,35 L25,35 Z" fill="currentColor"/>
              <path d="M65,20 C65,20 65,40 65,50 C65,60 75,65 75,75 C75,80 70,80 65,75 C60,70 60,65 60,60 C60,50 60,20 60,20" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">The Royal Table</h1>
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-16 bg-blue-300"></div>
            <div className="text-blue-200">❧</div>
            <div className="h-px w-16 bg-blue-300"></div>
          </div>
          <p className="text-blue-200 italic">Fine cuisine for distinguished tastes</p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Classic search and filter controls */}
        <div className="mb-8 md:mb-10 bg-white border-2 border-blue-200 rounded-lg shadow-md p-4 md:p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 relative z-10">
            <div className="w-full">
              <label className="block text-blue-800 font-semibold mb-2 text-sm">Browse Our Menu</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={handleSearch}
                  placeholder="Search dishes..."
                  className="w-full border-2 border-blue-200 rounded-lg py-2 px-4 pl-10 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg 
                  className="absolute left-3 top-2.5 h-5 w-5 text-blue-500" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="w-full mt-4 md:mt-0">
              <label className="block text-blue-800 font-semibold mb-2 text-sm">Arrange By</label>
              <div className="relative">
                <select
                  value={option}
                  onChange={handleOption}
                  className="w-full appearance-none bg-white border-2 border-blue-200 rounded-lg py-2 px-4 text-blue-800 font-serif focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Dishes</option>
                  <option value="price">By Price</option>
                  <option value="quantity">By Availability</option>
                  <option value="name">Alphabetically</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-5">
            <svg className="w-20 h-20 text-blue-900" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M30,35 C30,20 70,20 70,35 L70,70 C70,85 30,85 30,70 Z" fill="currentColor"/>
              <path d="M40,25 L40,15 M60,25 L60,15" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>

        {/* Food item cards with blue classic theme */}
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
                    {/* Decorative pattern border */}
                    <div className="absolute inset-x-0 top-0 h-2 bg-blue-700 opacity-75"></div>
                    
                    {/* Image container with elegant frame */}
                    <div className="relative pt-6 px-4">
                      <div className="relative rounded-lg overflow-hidden border-2 border-blue-200">
                        {/* Elegant corner accents */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-700 rounded-tl"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-700 rounded-tr"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-700 rounded-bl"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-700 rounded-br"></div>
                        
                        {/* Stock indicator */}
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
                          <svg className="w-4 h-4 text-blue-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
                            <circle cx="10" cy="10" r="3" fill="currentColor"/>
                          </svg>
                        </div>
                        <div className="h-px w-8 bg-blue-200"></div>
                      </div>
                      
                      <h2 className="text-center text-lg md:text-xl font-bold text-blue-800 mb-2">{item.name}</h2>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                          <span className="font-medium text-blue-800">{item.price} Rs.</span>
                        </div>
                          Category : {item.category}
                        
                        <div className="text-blue-600 group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                          <span className="font-serif italic text-sm mr-1">Details</span>
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
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
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h6 className="font-serif text-xl text-blue-800 font-semibold">
              Our Menu is Being Prepared
            </h6>
            <p className="text-blue-600 mt-2">Please check back soon for our delightful offerings.</p>
          </div>
        )}
      </div>
      
      {/* Classic footer */}
      <div className="mt-16 border-t-2 border-blue-200 py-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto text-center px-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 md:w-12 bg-blue-300"></div>
            <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
              <path d="M8,12 C8,6 16,6 16,12 C16,18 8,18 8,12 Z" fill="currentColor"/>
            </svg>
            <div className="h-px w-8 md:w-12 bg-blue-300"></div>
          </div>
          <p className="text-blue-700 italic text-sm font-medium">
            "One cannot think well, love well, sleep well, if one has not dined well."
          </p>
          <p className="text-blue-500 text-xs mt-1">— Virginia Woolf</p>
        </div>
      </div>
    </div>
  );
}

export default Available_Items;