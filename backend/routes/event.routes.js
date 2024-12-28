import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controller/event.controller.js";

const router = express.Router();

router.post("/create", createEvent);
router.get("/getAll/:userId", getAllEvents);
router.delete("/delete/:id", deleteEvent);
router.get("/getById/:id", getEventById);
router.post("/update", updateEvent);

export default router;
