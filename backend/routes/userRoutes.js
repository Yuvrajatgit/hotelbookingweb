import express from "express";
import { createUser, bookVisit, getAllBookings, cancelBooking, addToFav, getAllFav } from "../controllers/userController.js";
import jwtCheck from "../config/auth0config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id",jwtCheck, bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id",jwtCheck, cancelBooking);
router.post("/favourite/:rid",jwtCheck, addToFav);
router.post("/allFavourite",jwtCheck, getAllFav);

export {router as userRouter};