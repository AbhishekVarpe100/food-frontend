import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit, FiCheckCircle, FiXCircle } from "react-icons/fi";

function AdminSuggestions() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get("https://food-backend-1-xjm3.onrender.com/get-all-suggestions");
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Customer Suggestions
        </h2>

        {data.length > 0 ? (
          <div className="space-y-6">
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <p className="text-gray-700">
                    <span className="font-semibold">Suggested By:</span> {item.username}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-semibold">Description:</span> {item.suggestion}
                  </p>
                  <p className="text-gray-600 mt-2 flex items-center">
                    <span className="font-semibold">Replied:</span>{" "}
                    {!item.reply ? (
                      <span className="text-red-500 font-medium flex items-center">
                        <FiXCircle className="mr-1" /> Not Replied
                      </span>
                    ) : (
                      <span className="text-green-600 flex items-center">
                        <FiCheckCircle className="mr-1" /> {item.reply}
                      </span>
                    )}
                  </p>

                  <div className="mt-4">
                    <Link
                      to={`/admin/suggestions/reply/${item._id}`}
                      className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                      <FiEdit className="mr-2" />
                      {!item.reply ? "Give Reply" : "Edit Reply"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No suggestions found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminSuggestions;
