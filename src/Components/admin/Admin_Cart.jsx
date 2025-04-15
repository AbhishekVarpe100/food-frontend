import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';

function AdminCart() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get('https://food-backend-w91g.onrender.com/get-admin-cart');
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((username, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FiUsers className="text-gray-500 mr-2" />
                  <h2 className="text-lg font-medium text-gray-700">Customer Name</h2>
                </div>
                <Link
                  title={`Username: ${username}`}
                  to={`/admin/cart/${username}`}
                  className="text-blue-500 hover:text-blue-700 hover:underline"
                >
                  {username}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-4 text-gray-500">No users found</div>
      )}
    </div>
  );
}

export default AdminCart;
