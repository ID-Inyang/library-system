import Attendant from "../models/Attendant.js"

export const createAttendant = async (req, res) => {

    try {
        const { name, staffId } = req.body;

        if (!name || !staffId) {
            return res.status(400).json("Attendant data missing");
        }

        const newAttendant = await Attendant.create({name, staffId})

        res.status(201).json( newAttendant )
    } catch (error) {
        if (error.code === 11000) {  // Mongo duplicate
            return res.status(409).json({ error: 'Attendant exists' });
        }
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}

export const getAllAttendant = async (req, res) => {
    try {
        const attendants = await Attendant.find();

        res.status(200).json( attendants )
    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}


