import dotenv from "dotenv";
dotenv.config({ path: './config.env' });

import app from './app';
import connectToDatabase from "./config/db";

const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(3500, () => {
            console.log("Server started on port 3500");
        });
    } catch (err) {
        console.error("Failed to connect to database", err);
        process.exit(1);
    }
};

startServer().catch(err => {
    console.error('Unhandled error:', err);
});