import React from 'react';

export const EventChangePopUP = ({ id, title, clientName, events, setMyEvents, onClose }) => {
  const [Service, setService] = React.useState(title);
  const [Name, setName] = React.useState(clientName);
  const updatedEvents = [...events];
  
  const updateEvent = updatedEvents.map((event) => {
    if (event.id === id) {
      return { ...event, title: Service};
    }
    return event;
  })

  const saveChanges = (e) => {
    e.preventDefault();
  
    console.log("title", Service);
    console.log("clientName", Name);
  
    setMyEvents(updateEvent);
    console.log("UpdatedEvents", updateEvent);
  
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white border border-gray-200 p-8 rounded shadow-lg w-[30rem]">
        <form onSubmit={saveChanges} className="flex flex-col">
          <label htmlFor="Service">Service</label>
          <input
            type="text"
            id="Service"
            className="text-darkText border border-gray-300 rounded p-2 mt-2"
            value={Service}
            onChange={(e) => setService(e.target.value)}
          />

          <label htmlFor="Name" className="mt-4">Name</label>
          <input
            type="text"
            id="Name"
            className="border border-gray-300 rounded p-2 mt-2 text-darkText"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
