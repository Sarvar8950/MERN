import mongoose from "mongoose"


const connection = async () => {
    try {
        // await mongoose.connect("mongodb://localhost:27017/", {
        await mongoose.connect("mongodb://127.0.0.1/todo_mern", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("mongodb connected")
    } catch (error) {
        console.log("mongodb connection error", error)
    }
}

export default connection;
