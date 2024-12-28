import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    location: "",
  });

  const fetchEventById = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/events/getById/${id}`);
      console.log(res.data);
      setFormData(res.data.event);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const reqbody = {
      id: id,
      name: formData.name,
      location: formData.location,
    };
    try {
      const res =await  axios.post(`${BASE_URL}/events/update`, reqbody);
      console.log(res.data);
      toast.success(res.data.message);
      navigate("/events");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchEventById();
  }, [id]);
  return (
    <div className="min-h-screen flex flex-col items-center pt-10">
      <h1 className="text-3xl font-semibold mb-8">Update Event</h1>

      <form
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
        onSubmit={handleUpdate}
      >
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter event name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
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
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Enter event location"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
              Update Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;
