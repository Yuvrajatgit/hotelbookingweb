import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRouter } from "./routes/userRoutes.js";
import { residencyRouter } from "./routes/residencyRoutes.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/residency', residencyRouter);

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
});