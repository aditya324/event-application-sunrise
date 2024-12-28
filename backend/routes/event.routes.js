import express from "express";
import { createEvent, deleteEvent, getAllEvents, updateEvent } from "../controller/event.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router=express.Router();




router.post("/create",authMiddleware,createEvent );
router.get("/getAll",getAllEvents);
router.delete("/delete/:id",authMiddleware,deleteEvent)
router.post("/update",authMiddleware,updateEvent)


export default router