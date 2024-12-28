import React from "react";

const EventCard = ({ event, onSave, onDelete, onUpdate }) => {
  return (
    <div className="max-w-xs w-full bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl">
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-gray-800 mb-2">{event.name}</div>
        <p className="text-gray-600 text-sm">{event.location}</p>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => onSave(event)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all"
        >
          Save
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-all"
          onClick={() => onUpdate(event._id)}
        >
          Update
        </button>
        <button
          onClick={() => onDelete(event._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
