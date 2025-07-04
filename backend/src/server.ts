import dotenv from "dotenv";
dotenv.config({ path: './config.env' });

import app from './app';
import connectToDatabase from "./config/db";
import {PORT} from "./constants/env";


const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (err) {
        console.error("Unexpected startup error:", err);
        process.exit(1);
    }
};

startServer().catch(err => {
    console.error('Unhandled error:', err);
});