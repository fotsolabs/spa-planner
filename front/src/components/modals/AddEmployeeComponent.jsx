import React, { useState } from 'react';
import EmployeeApi from '../../api/EmployeeApi';

const AddEmployeeComponent = ({ setShowEmpModal, employees, setEmployees }) => {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    // Create preview image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // base64 preview image
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      photo: preview, // use preview to display later (you could store file if you plan to upload it)
      fullName: Name,
      email,
      phone
    };

    try{
      const res = EmployeeApi.addEmployee(newEmployee)
      console.log("Employee added successfully:", res);
      setEmployees((prev) => [...prev, newEmployee]);
      setShowEmpModal(false);
    }
    catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-center text-2xl font-semibold mb-6'>Add Employee</h2>

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="John Doe"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Email:</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Phone:</label>
            <input
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="438-927-2781"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Photo:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-3 border border-gray-300 rounded-lg"
              onChange={handleFileChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 rounded-md border max-h-40 object-cover"
              />
            )}
          </div>

          <div className='flex justify-center'>
            <button
              type="submit"
              className="w-full bg-creamyGreen text-white py-3 rounded-lg text-lg font-medium hover:bg-creamyGreenDark transition-colors">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;
