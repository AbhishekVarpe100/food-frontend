import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud, FiCheckCircle, FiAlertCircle, FiDollarSign, FiPackage, FiTag, FiCoffee } from 'react-icons/fi';

function AddItem() {
  const [data, setData] = useState({ name: '', price: '', quantity: '', category: '' });
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('food', data.name);
    formData.append('price', data.price);
    formData.append('quantity', data.quantity);
    formData.append('category', data.category);
    formData.append('file', file);

    try {
      const res = await axios.post('https://food-backend-1-xjm3.onrender.com/add-item', formData);
      if (res.data.msg === 'added') {
        setSuccess('Added successfully');
        setUploading(false);
        setTimeout(() => {
          setSuccess('');
          navigate('/admin');
        }, 3000);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add item. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 mt-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center">
          <FiCoffee className="mr-2 text-yellow-500" />
          Add Food Item
        </h2>

        {success && (
          <div className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-6 animate-pulse">
            <FiCheckCircle className="mr-2 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            <FiAlertCircle className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium flex items-center">
              <FiTag className="mr-2 text-yellow-500" />
              Food Name
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              placeholder="Enter food name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium flex items-center">
              <FiDollarSign className="mr-2 text-yellow-500" />
              Price
            </label>
            <input
              type="text"
              name="price"
              required
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium flex items-center">
              <FiPackage className="mr-2 text-yellow-500" />
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              required
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Category
            </label>
            <select 
              required 
              name="category" 
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white transition-all"
            >
              <option value="">---Select Category---</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

          <div className="relative">
            <label className="inline-block w-full px-4 py-3 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition-colors text-center font-medium shadow-md">
              <FiUploadCloud className="inline-block mr-2" />
              Upload Image
              <input
                required
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            {file && (
              <p className="mt-2 text-sm text-gray-600 flex items-center">
                <FiCheckCircle className="mr-1 text-green-500" />
                Selected: {file.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full font-medium px-4 py-3 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors shadow-md flex items-center justify-center"
          >
            {uploading ? 'Uploading...' : 'Add Item'}
          </button>

          {uploading && (
            <div className="text-center font-medium text-green-500 flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddItem;