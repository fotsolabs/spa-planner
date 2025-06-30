import React, { useEffect, useRef, useState } from 'react';

const EventModal = ({ setMyEvents, setShowEventModal, services = [] }) => {
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [service, setService] = useState('');
  const [price, setPrice] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowEventModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowEventModal]);

  // Update price when service changes
  useEffect(() => {
    if (service) {
      const selectedService = services.find(s => s.serviceName === service);
      if (selectedService) {
        setPrice(selectedService.price || '');
      }
    } else {
      setPrice(''); // Reset price if no service is selected
    }
  }, [service, services]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      title,
      clientName,
      service,
      price,
      start: new Date(start),
      end: new Date(end),
      allDay: false,
      isDraggable: true,
    };
    setMyEvents((prev) => [...prev, newEvent]);
    setShowEventModal(false);
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50'>
      <div
        ref={modalRef}
        className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'
      >
        <h2 className='text-center text-2xl font-semibold mb-6'>Add New Event</h2>

        <form className='space-y-6' onSubmit={handleSubmit}>
          <InputField label="Title" value={title} setValue={setTitle} placeholder="Meeting with client" required />
          <InputField label="Client Name" value={clientName} setValue={setClientName} placeholder="John Doe" />
          
          {/* Service Dropdown Select */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Service:</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            >
              <option value="">Select a service</option>
              {services.map((serviceItem) => (
                <option key={serviceItem.id} value={serviceItem.serviceName}>
                  {serviceItem.serviceName} (${serviceItem.price})
                </option>
              ))}
            </select>
          </div>

          <InputField 
            label="Price" 
            value={price} 
            setValue={setPrice} 
            placeholder="Price will auto-fill" 
            type="number"
            readOnly // Make price field read-only since it's auto-filled
          />
          <InputField label="Start Time" value={start} setValue={setStart} type="datetime-local" required />
          <InputField label="End Time" value={end} setValue={setEnd} type="datetime-local" required />

          <div className='flex justify-center'>
            <button
              type="submit"
              className="w-full bg-creamyGreen text-white py-3 rounded-lg text-lg font-medium hover:bg-creamyGreenDark transition-colors"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, value, setValue, type = "text", placeholder, required, readOnly = false }) => (
  <div>
    <label className='block text-sm font-medium text-gray-700 mb-2'>{label}:</label>
    <input
      type={type}
      className={`w-full p-3 border border-gray-300 rounded-lg ${readOnly ? 'bg-gray-100' : ''}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={required}
      readOnly={readOnly}
    />
  </div>
);

export default EventModal;