import mongoose from "mongoose"
import dotenv from "dotenv"
import chalk from "chalk"

dotenv.config()

export const connectDB = () => mongoose.connect(process.env.MONGO_URI)
    .then(() => {
            console.log( chalk.green("Connected successful") )
        }
    )
    .catch( (err) => {
            console.log( chalk.redBright("Unable to connect to database: "), chalk.white.bgRed(err) )
        }
    )