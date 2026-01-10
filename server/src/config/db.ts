import mongoose from 'mongoose';
import {MONGO_URI} from '../constants/env';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Successfully connected to database');

        // Listen for errors AFTER the initial connection
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB runtime error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB connection lost. Attempting to reconnect...');
        });
    } catch (error) {
        console.log('Could not connect to database', error);
        process.exit(1);
    }
};

export const disconnectedFromDatabase = async () => {
    try {
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error during database disconnection:', error);
    }
}

export default connectToDatabase;