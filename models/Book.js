import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    authors: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Author"
        }
    ],
    status: {
        type: String,
        enum: ["IN", "OUT"],
        default: "IN"
    },
    borrowedBy: 
        {
            type: Schema.Types.ObjectId, 
            ref: "Student",
            default: null
        },
    issuedBy: 
        {
            type: Schema.Types.ObjectId,
            ref: "Attendant",
            default: null
        },
    returnDate: {
        type: Date,
        default: null
    }
}, { timestamps: true })

const Book = mongoose.model("Book", bookSchema);
export default Book