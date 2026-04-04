import { Router } from "express";
import { createAttendant, getAllAttendant } from "../controllers/attendantController.js";

const attendantRoutes = Router();

attendantRoutes.route('/')
    .get(getAllAttendant)
    .post(createAttendant)

export default attendantRoutes;