import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import toast from "react-hot-toast";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const reqBody = {
      id: userId,
      name: formData.name,
      location: formData.location,
    };
    try {
      const res = await axios.post(`${BASE_URL}/events/create`, reqBody);
      console.log(res.data);
      toast.success(res.data.message);
      navigate("/events");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center pt-10">
      <h1 className="text-3xl font-semibold mb-8">Add New Event</h1>

      <form
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
        onSubmit={handleSubmit}
      >
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Enter event name"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              value={formData.location}
              placeholder="Enter event location"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
              Add Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
