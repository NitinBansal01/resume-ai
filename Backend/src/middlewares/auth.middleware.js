const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

// the purpose of auth middleware is to protect certain routes in our application that require authentication. It checks if the incoming request has a valid JWT token in the cookies and verifies it. If the token is valid, it allows the request to proceed to the next middleware or route handler. If the token is missing, invalid, or blacklisted, it returns a 401 Unauthorized response. This ensures that only authenticated users can access protected routes and perform certain actions in our application.
//next means that if the token is valid, we will call the next() function to pass the control to the next middleware or route handler in the request-response cycle. This allows the authenticated user to access the protected route and perform the desired action. If the token is invalid or missing, we will return a response with a 401 status code and an appropriate error message, preventing unauthorized access to the protected route.

async function authUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //.verify returns the decoded payload if the token is valid, otherwise it throws an error. The decoded payload contains the user information that was encoded in the token during registration or login. We can then attach this user information to the req object (e.g., req.user = decoded) so that it can be accessed in subsequent middleware functions or route handlers to perform authorization checks or retrieve user-specific data.
        

        req.user = decoded

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token."
        })
    }

}


module.exports = { authUser }