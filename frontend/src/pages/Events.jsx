import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils";
import EventCard from "../components/EventCard";
import toast from "react-hot-toast";
import { use } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const userId = localStorage.getItem("userId");
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const navigate = useNavigate();

  const fetchAllEvents = async () => {
    if (!userId) {
      toast.error("Please login first");
      return;
    }
    try {
      const res = await axios.get(`${BASE_URL}/events/getAll/${userId}`);
      console.log(res.data);
      setEvents(res.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const onSave = async (event) => {
    console.log(event);

    if (!userId) {
      toast.error("Please login first");
      return;
    }
    const reqbody = {
      id: userId,
      name: event.name,
      location: event.location,
    };
    try {
      const res = await axios.post(`${BASE_URL}/events/create`, reqbody);
      console.log(res.data);
      toast.success(res.data.message);
      fetchAllEvents();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "something went wrong");
    }
  };

  const onDelete = async () => {
    try {
      if (selectedEventId) {
        const res = await axios.delete(
          `${BASE_URL}/events/delete/${selectedEventId}`
        );
        console.log(res.data);
        toast.success(res.data.message);
        setShowModal(false);
        fetchAllEvents();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const onupdate = async (event) => {
    console.log(event);
    navigate(`/update/${event}`);

    if (!userId) {
      toast.error("Please login first");
      return;
    }
  };

  const handleEventClick = (eventId) => {
    setSelectedEventId(eventId);
    setShowModal(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {events.map((event) => (
          <div key={event._id} className="flex justify-center items-center">
            <EventCard
              event={event}
              onSave={onSave}
              onUpdate={onupdate}
              onDelete={() => handleEventClick(event._id)}
            />
          </div>
        ))}
      </div>

      {/* Modal for confirmation */}
      {showModal && (
        <div
          id="deleteModal"
          tabindex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-opacity-50 bg-gray-500"
        >
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
            <div className="relative p-4 text-center">
              <button
                type="button"
                className="absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5"
                onClick={() => setShowModal(false)} // Close the modal
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <p className="mb-4 text-gray-500">
                Are you sure you want to delete this event?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200"
                  onClick={() => setShowModal(false)} // Close the modal
                >
                  No, cancel
                </button>
                <button
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg"
                  onClick={onDelete}
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {
        // Modal for updating
      }
    </div>
  );
};

export default Events;
