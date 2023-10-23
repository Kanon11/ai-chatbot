import { connect,disconnect } from "mongoose";

 async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(`ErOr from connectToDatabase function: ${error}`)
        throw new Error("Can't connect to MongoDB");
    }
}

const disconnectFromDatabase = async () => {
    try {
        await disconnect()
    } catch (error) {
        console.log(`ErOr from disconnectFromDatabase function: ${error}`)
        throw new Error("Can't disconnect to MongoDB");
    }
}

export  {
    connectToDatabase,
    disconnectFromDatabase
}