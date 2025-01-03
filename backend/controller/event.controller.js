import eventModel from "../schema/event.model.js";

export const createEvent = async (req, res) => {
  const { id, name, location } = req.body;

  try {
    const newEvent = new eventModel({ name, location, createdBy: id });
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const events = await eventModel.find({ createdBy: userId });

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found with this ID" });
    }

    res.json({ events });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getEventById = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const event = await eventModel.findById(id);
    console.log(event);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ event });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    await eventModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEvent = async (req, res) => {
  const { id, name, location } = req.body;

  console.log(req.body);

  try {
    const event = await eventModel.findByIdAndUpdate(
      id,
      { name, location },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
