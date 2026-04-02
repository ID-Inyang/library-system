import Author from "../models/Author.js"

export const createAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body
    
        const newAuthor = await Author.create({ name, bio })

        res.status(201).json( newAuthor );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAuthors = async (req, res) => {
    try {

        const authors = await Author.find()

        res.status(200).json( authors );
    } catch (error) {
        res.status(500).json({ message: error.message })
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
        res.status(404).json({ message: error.message })
    }
}

// update author
export const updateAuthor = async (req, res) => {
    try {
        const id = req.params.id;

        const requestBody = req.body;

        if (!requestBody) {
            return res.status(404).json("Not found")
        }

        const updateAuthor = await Author.findByIdAndUpdate(id, requestBody, { new: true })

        if(!updateAuthor) {
            return res.status(404).json("Author not found")
        }

        res.status(200).json( updateAuthor );
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Delete author
export const deleteAuthor = async (req, res) => {
    try {
        const id = req.params.id

        const deleteAuthor = await Author.findByIdAndDelete(id)

        res.status(204).end()
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}