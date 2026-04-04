import Book from "../models/Book.js";

export const createBook = async (req, res) => {
    try {
        const { title, isbn, authors, status, borrowedBy, issuedBy } = req.body

        if (!title || !isbn ) return res.status(400).json( "Required Field missing" );

        const newBook = await Book.create({title, isbn, authors})

        res.status(201).json( newBook )
    } catch (error) {
        if (error.code === 11000) {  // Mongo duplicate
            return res.status(409).json({ error: 'Book exists' });
        }
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()

        res.status(200).json( books );
        
    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate("authors")
            .populate("borrowedBy")
            .populate("issuedBy")

        if(!book) {
            return res.status(404).json("Book not found")
        }

        res.status(200).json( book );

    } catch (error) {
            res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}

export const updateBook = async (req, res) => {
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

        const updatedBook = await Book.findByIdAndUpdate(id, requestBody, { new: true })

        if(!updatedBook) {
            return res.status(404).json("Book not found")
        }

        res.status(200).json( updatedBook );
    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}

export const deleteBook = async (req, res) => {
    try {
        const id = req.params.id

        const deletedBook = await Book.findByIdAndDelete(id)

        if(!deletedBook) {
            return res.status(404).json("Book not found")
        }

        res.status(204).send()
    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}

export const borrowBook = async (req, res) => {
    try {
        const { studentId, attendantId, returnDate } = req.body
        const bookId = req.params.id;

        let borrowedBook;
        const book = await Book.findById(bookId)
        if (!book) {
            return res.status(404).json("Book not found!")
        }

        if (book.status === "OUT"){
            return res.status(400).json("Book is out");
        } else {
            borrowedBook = await Book.findByIdAndUpdate(bookId, {
                status: "OUT",
                borrowedBy: studentId,
                issuedBy: attendantId,
                returnDate: returnDate
            }, { new: true })

            res.status(200).json("Updated")
        }

    } catch (error) {
        res.status(500).json( error.message )
    }
}

export const returnBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId)

        let returnedBook;
        if (!book) {
            return res.status(400).json("Book not found!")
        }
        if (book.status === "OUT"){
            returnedBook = await Book.findByIdAndUpdate(bookId, 
                {status: "IN",
                borrowedBy: null,
                issuedBy: null,
                returnDate: null
            }, {new: true})

            res.status(200).json("Book returned")
        } else {
            return res.status(400).json("NOTHING TO RETURN")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}