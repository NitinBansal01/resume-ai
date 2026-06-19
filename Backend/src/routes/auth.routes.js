//the point of auth.routes.js file is to define the routes for authentication-related operations in our application. This file will contain the endpoints for user registration, login, logout, and getting the current logged-in user's details. By defining these routes in a separate file, we can keep our code organized and modular, making it easier to maintain and scale our application in the future. Additionally, we can apply middleware functions to these routes to handle authentication and authorization logic, ensuring that only authorized users can access certain endpoints.
// these jdocs are used to provide documentation for the API endpoints defined in this file. They describe the route, its purpose, and the access level required to use it. This documentation can be used by developers who are consuming the API to understand how to interact with it and what to expect from each endpoint. 
const { Router } = require('express')
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router()
//authRouter is used to create a new router object that can be used to define routes for authentication-related operations in our application. It allows us to group related routes together and apply middleware functions to them, making it easier to manage and maintain our code. By using authRouter, we can define endpoints for user registration, login, logout, and getting the current logged-in user's details in a structured and organized way.

//What is it?
//It's a structured comment block that documents a function, route, or module. It starts with /** and ends with */. Developers write these above functions to explain what the code does — without affecting how the code runs.
//Think of it like a label on a medicine bottle — the medicine (code) works the same with or without the label, but the label tells you what it does, how to use it, and any warnings.
//What is @?
//The @ symbol marks a JSDoc tag (also called an annotation or decorator in docs context). Each tag is a keyword that describes a specific property of the function.
/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 * @params username, email and password in request body
 * @returns success message and user details in response body
 */
authRouter.post("/register", authController.registerUserController) // this line of code is used to define a route for user registration. It uses the post method of the authRouter to handle incoming POST requests to the /register endpoint. When a request is made to this endpoint, the registerUserController function from the authController is called to handle the registration logic. 



/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)


/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.get("/logout", authController.logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)


module.exports = authRouter