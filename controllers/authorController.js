import Author from "../models/Author.js"

export const createAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body
    
        if (!name) {
            return res.status(400).json("Invalid Data!")
        }

        const newAuthor = await Author.create({ name, bio })

        res.status(201).json( newAuthor );
    } catch (error) {
        if (error.code === 11000) {  // Mongo duplicate
            return res.status(409).json({ error: 'Author exists' });
        }
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}

export const getAuthors = async (req, res) => {
    try {

        const authors = await Author.find()

        res.status(200).json( authors );
    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}

// Get single author
export const getAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)

        if(!author) {
            return res.status(404).json("Author not found")
        }
        res.status(200).json( author );

    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}

// update author
export const updateAuthor = async (req, res) => {
    try {
        const id = req.params.id;

        const requestBody = req.body;

        const isEmpty = (obj) => obj && obj.constructor === Object && Object.keys(obj).length === 0;

        if (isEmpty(requestBody)) {
            return res.status(400).json("Not found")
        }

        function hasUndefinedValue(obj) {
            for (const [key, value] of Object.entries(obj)) {
                if (value === undefined) {
                console.log(`Key '${key}' is missing a value`);
                return true;
                }
            }
            return false;
        }

        if (hasUndefinedValue(requestBody)) {
            return res.status(400).json("Data missing");
        }

        const updateAuthor = await Author.findByIdAndUpdate(id, requestBody, { new: true })

        if(!updateAuthor) {
            return res.status(404).json("Author not found")
        }

        res.status(200).json( updateAuthor );
    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}

// Delete author
export const deleteAuthor = async (req, res) => {
    try {
        const id = req.params.id

        const deleteAuthor = await Author.findByIdAndDelete(id)

        if(!deleteAuthor) {
            return res.status(404).json("Author not found")
        }

        res.status(204).send()
    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}