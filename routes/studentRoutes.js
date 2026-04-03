import { Router } from "express";
import { createStudent, getAllStudents, getStudentById } from "../controllers/studentController.js";

const studentRoutes = Router();

studentRoutes.route('/')
    .post(createStudent)
    .get(getAllStudents)

studentRoutes.route('/:id')
    .get(getStudentById)
    
export default studentRoutes