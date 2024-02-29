import { connect, disconnect } from 'mongoose';
import { config } from "dotenv";

config();

async function connectDB() {
    try {
        console.log("Opening connection to MongoDB...");
        const conn = await connect(process.env.MONGO_URI + '/' + process.env.DB_NAME, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true
            //useCreateIndex: true,
            //useFindAndModify: false
        });
        console.log(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
    } catch (err) {
        disconnect();
        console.error(err.message);
        process.exit(1);
    }
}

export default connectDB;