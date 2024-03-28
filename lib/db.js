import mongoose from 'mongoose';

const MONGODB_URI = process.env.NEXT_MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedConnection = null;

async function dbConnect() {
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        // const opts = {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // };

        const connection = await mongoose.connect(MONGODB_URI);
        cachedConnection = connection;
        return connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
}

export default dbConnect;
