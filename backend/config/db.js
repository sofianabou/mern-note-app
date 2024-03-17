import mongoose from "mongoose";

const URI = "mongodb://localhost:27017/dbkanban";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

/*MONGO_URI="mongodb://localhost:27017/dbkanban"
JWT_SECRET="Sofiane@Test123456789"
VITE_API_BASE_URL=http://localhost:3000
*/