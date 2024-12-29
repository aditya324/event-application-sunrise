import express from "express";
import path from "path";
import  {loginUser, registerUser}  from "../controller/auth.controller.js";
         








const router=express.Router();


router.post("/register",registerUser);
router.post("/login",loginUser);



export default router