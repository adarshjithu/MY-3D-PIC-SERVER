
import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import app from './app'
import { connectDatabase } from './config/connectDatabase';
const PORT = process.env.PORT;
connectDatabase()
app.listen(5000, () => {
    console.log(`Server started at ${PORT} `)
});
 