import React, { useState } from 'react';

const AddServiceComponent = ({ content, setContent }) => {
  // State to store the form data
  const [serviceName, setServiceName] = useState('');
  const [duration, setDuration] = useState(10);  // default duration (in minutes)
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent page reload

    // Create a new service object
    const newService = {
      serviceName,
      duration,
      price,
      category,
    };

    // Add the new service to the content list
    setContent([...content, newService]);

    // Optionally, reset the form fields after submission
    setServiceName('');
    setDuration(10);
    setPrice('');
    setCategory('');
  };

  return (
    <div className='h-full flex justify-center items-center bg-slate-500'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-center text-2xl font-semibold mb-6'>Add New Service</h2>
        
        <form className='space-y-6' onSubmit={handleSubmit}>
          {/* Service Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Service Name:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-creamyGreen"
              placeholder="Enter service name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>

          {/* Duration */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Duration:</label>
            <select
              name="hours"
              id="hours"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-creamyGreen"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              {Array.from({ length: (120 - 10) / 5 + 1 }, (_, i) => {
                const value = 10 + i * 5;
                const hours = Math.floor(value / 60); // Calculate hours
                const minutes = value % 60; // Calculate minutes
                const formattedValue = `${hours ? `${hours}h ` : ''}${minutes ? `${minutes}m` : ''}`; // Format as "Xh Ym"
                return (
                  <option key={value} value={value}>
                    {formattedValue}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Price:</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-creamyGreen"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Category:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-creamyGreen"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className='flex justify-center'>
            <button
              type="submit"
              className="w-full bg-creamyGreen text-white py-3 rounded-lg text-lg font-medium hover:bg-creamyGreenDark transition-colors"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceComponent;
