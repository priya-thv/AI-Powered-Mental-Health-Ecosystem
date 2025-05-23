import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getuserfromsidebar } from "../controllers/user.controller.js";

const router=express.Router();

router.get("/",protectRoute,getuserfromsidebar);

export default router;