const express = require("express") // first thing we need to do is to import express to use it in our app.js file
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express() // then we need to create an instance of express and store it in a variable called app

app.use(express.json()) // this line of code is used to parse the incoming request body in JSON format and make it available in the req.body property of the request object. It allows us to easily access and manipulate the data sent by the client in the request body.
app.use(cookieParser())//used to parse the cookies sent by the client in the request headers and make them available in the req.cookies property of the request object.

app.use(cors({
    origin:[
        "https://resume-ai-rho-rose.vercel.app/" , 
        "http://localhost:5173", 
        "https://resume-ai-nitinbansal.vercel.app"
     ],
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes") // why we need to import authRouter here? We need to import authRouter here because we will be using it to define the routes for authentication-related operations in our application. By importing it in the app.js file, we can use it to set up the routes for user registration, login, logout, and getting the current logged-in user's details. 

    

const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter) // why prefix with /api/auth? We prefix the routes with /api/auth to create a clear and organized structure for our API endpoints. This way, all authentication-related routes will be grouped under the /api/auth path, making it easier for developers to understand the purpose of each endpoint and navigate through the API documentation. It also helps to avoid potential conflicts with other routes in the application and provides a consistent naming convention for our API endpoints.and .use is used to mount the authRouter on the /api/auth path, meaning that any requests made to endpoints starting with /api/auth will be handled by the authRouter. For example, a POST request to /api/auth/register will be routed to the registerUserController function defined in the authRouter.
app.use("/api/interview", interviewRouter)



module.exports = app // finally we need to export the app variable so that we can use it in other files like server.js where we will start our server and listen for incoming requests.