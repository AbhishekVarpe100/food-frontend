import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud } from 'react-icons/fi';

function AddItem() {
  const [data, setData] = useState({ name: '', price: '', quantity: '' });
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append('food', data.name);
    formData.append('price', data.price);
    formData.append('quantity', data.quantity);
    formData.append('file', file);
    
    try {
      const res = await axios.post('https://food-backend-w91g.onrender.com/add-item', formData);
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
      setUploading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add Food Item
        </h2>
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Price</label>
            <input
              type="text"
              name="price"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Quantity</label>
            <input
              type="text"
              name="quantity"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div className="relative">
            <label className="inline-block w-full px-4 py-2 bg-amber-500 text-white rounded-md cursor-pointer hover:bg-amber-600 transition-colors text-center">
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
            className="w-full font-bold px-4 py-2 text-amber-500 border border-amber-500 rounded-md hover:bg-amber-500 hover:text-white transition-colors"
          >
            Add Item
          </button>
          
          {uploading && (
            <div className="text-center font-bold text-green-500">
              Uploading...
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddItem;