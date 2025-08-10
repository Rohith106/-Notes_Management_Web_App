import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import noteRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT =process.env.PORT || 5001


//middleware
app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes",noteRoutes);


connectDB().then(() => {
    app.listen(PORT,()=>{
    console.log("server started on port:",PORT);
    });
})

//1zMotltRhS0Qe6t1

//mongodb+srv://202019871rohith:1zMotltRhS0Qe6t1@cluster0.dafytvx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0