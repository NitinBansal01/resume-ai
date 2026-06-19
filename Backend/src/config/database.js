const mongoose = require("mongoose") 
// we need to import mongoose to use it in our database.js file. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straight-forward, schema-based solution to model our application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.



async function connectToDB() {

    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to Database")
    }
    catch (err) {
        console.log(err)
    }
}// this function is used to connect to the MongoDB database using the mongoose library. It uses the connect method of mongoose to establish a connection to the database using the MONGO_URI environment variable defined in the .env file. If the connection is successful, it logs a message to the console indicating that the connection was successful. If there is an error while connecting to the database, it logs the error to the console.

module.exports = connectToDB