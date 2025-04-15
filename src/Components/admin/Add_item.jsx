import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

function AddItem() {
  const [data, setData] = useState({ name: '', price: '', quantity: '',category:'' });
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
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-xl font-medium text-center mb-6">
          Add Food Item
        </h2>

        {success && (
          <div className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <FiCheckCircle className="mr-2" />
            {success}
          </div>
        )}

        {error && (
          <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <FiAlertCircle className="mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Food Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Price</label>
            <input
              type="text"
              name="price"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Quantity</label>
            <input
              type="text"
              name="quantity"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select required name="category" onChange={handleChange}>

            <option>---select category---</option>3
            <option value="Pure Veg">Pure Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>

          <div className="relative">
            <label className="inline-block w-full px-4 py-2 bg-yellow-500 text-white rounded-md cursor-pointer hover:bg-yellow-600 transition-colors text-center">
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
              <p className="mt-2 text-sm text-gray-600">
                Selected: {file.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full font-medium px-4 py-2 text-yellow-500 border border-yellow-500 rounded-md hover:bg-yellow-500 hover:text-white transition-colors"
          >
            Add Item
          </button>

          {uploading && (
            <div className="text-center font-medium text-green-500">
              Uploading...
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddItem;
