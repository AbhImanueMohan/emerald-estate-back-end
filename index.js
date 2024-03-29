import express from "express";
import mongoose  from 'mongoose';
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js"
import authRouter from "./routes/authRouter.js"
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listingRouter.js"



dotenv.config();



mongoose.connect(process.env.DATABASES).then(()=>{
    console.log("connected to mongodb");
})
.catch((err)=>{
console.log(err);
})
const app = express();


app.use(express.json());

app.use(cookieParser());

app.listen(3001, ()=>{
    console.log("Server is running on port 3001");
});

app.use("/api/user", userRouter )
app.use("/api/auth" , authRouter )
app.use("/api/listing" , listingRouter )


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    });
});