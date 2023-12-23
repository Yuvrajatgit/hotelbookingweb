import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js'; 

export const createUser = asyncHandler(async(req,res)=>{
 const {email} = req.body;
 const userExists = await prisma.user.findUnique({where: {email}});

 if(!userExists){
   const user = await prisma.user.create({data: req.body});
   res.send({
    message: "User registered successfully",
    user: user,
   });
 }else res.status(201).send({message: "User already registered"});
})

export const bookVisit = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {email, date} = req.body;
    try{
      const alreadyBooked = await prisma.user.findUnique({
        where: {email},
        select: {bookedvisits: true}
      })
      if (alreadyBooked.bookedvisits.some((visit)=> visit.id === id)){
        res.status(400).json({message: "The visit is already booked by you"})
      }else {
        await prisma.user.update({
            where: {email: email},
            data: {
                bookedvisits: {push: {id, date}}
            }
        })
        res.send('Your visit is booked successfully');
      }
    }catch(err){
        throw new Error(err.message);
    }
})

export const getAllBookings = asyncHandler(async(req, res)=>{
    const {email} = req.body;
    try{
      const bookings = await prisma.user.findUnique({
        where: {email},
        select: {bookedvisits: true}
      })
      res.status(200).send(bookings);
    }catch(err){
        throw new Error(err.message);
    }
})

export const cancelBooking = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const {id} = req.params;
    try{
        const user = await prisma.user.findUnique({
          where: {email},
          select: {bookedvisits: true}
        })
        const index = user.bookedvisits.findIndex((visit)=>visit.id === id);
        if(index === -1){
            res.status(404).json({message: "Booking not found"})
        } else {
            user.bookedvisits.splice(index,1)
            await prisma.user.update({
                where: {email: email},
                data: {
                    bookedvisits: user.bookedvisits
                }
            });
            res.send("Bookings cancelled successfully")
        }
      }catch(err){
          throw new Error(err.message);
      }
})

export const addToFav = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const {rid} = req.params;
    try{
        const user = await prisma.user.findUnique({
            where: {email}
          })
        if(user.favResidenciesID.includes(rid)){
            const updatedUser = await prisma.user.update({
                where: {email},
                data: {
                    favResidenciesID :{
                        set: user.favResidenciesID.filter((id)=>id !==rid)
                    }
                }
              });
              res.send({message: 'Removed from favourites', user: updatedUser})
        }  else {
            const updatedUser = await prisma.user.update({
                where: {email},
                data: {
                    favResidenciesID :{
                        push : rid
                    }
                }
              });
             res.send({message: 'Added to favourites', user: updatedUser})
        }
      }catch(err){
          throw new Error(err.message);
      }
});

export const getAllFav = asyncHandler(async(req,res)=>{
    const {email} = req.body;

    try{
        const favResd = await prisma.user.findUnique({
            where: {email},
            select: {favResidenciesID: true}
          })
        res.status(200).send(favResd);  
      }catch(err){
          throw new Error(err.message);
      }
})