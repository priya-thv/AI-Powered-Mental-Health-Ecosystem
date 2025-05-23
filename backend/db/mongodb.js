

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// const connecttomongodb = async () => {
//     try {
//         if (!process.env.MONGODB_URI) {
//             throw new Error("MONGODB_URI is missing from .env file");
//         }
        
//         await mongoose.connect(process.env.MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log("✅ Connected to MongoDB");
//     } catch (error) {
//         console.log("❌ Can't connect to MongoDB:", error.message);
//     }
// };

// export default connecttomongodb;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);  // Stop the server if MongoDB fails to connect
    }
};

export default connectToMongoDB;

