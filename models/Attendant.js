import mongoose from "mongoose";

const { Schema } = mongoose;

const attendantSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        staffId: {
            type: String,
            required: true,
            unique: true
        }
    }, {timestamps: true}
)

const Attendant = mongoose.model("Attendant", attendantSchema);
export default Attendant;