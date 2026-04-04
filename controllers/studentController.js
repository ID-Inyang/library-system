import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
    try {
       const { name, email, studentId } = req.body

        if (!name || !email || !studentId)
        {
            return res.status(400).json({error: "Required data missing"})
        } 

        const newStudent = await Student.create({name, email, studentId})

        res.status(201).json({
            newStudent
        })
    } catch (error) {
        if (error.code === 11000) {  // Mongo duplicate
            return res.status(409).json({ error: 'Student exists' });
        }
        res.status(500).json({error: error.message})
    }
}

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json( students );

    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}

export const getStudentById = async (req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findById(id);

        if(!student) {
            return res.status(404).json("Student not found");
        }
        res.status(200).json( student );

    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}