import axios from "axios"
//axios is a popular JavaScript library used for making HTTP requests from the browser or Node.js. It provides an easy-to-use API for sending asynchronous requests to a server and handling responses. In this code, axios is imported to create an instance of the axios client that will be used to make API requests related to authentication.
//used to connect frontend to backend and is very important.


const api = axios.create({
    baseURL: process.env.VITE_API_URL,
    withCredentials: true
})
//.create() is a method provided by the axios library that allows us to create a new instance of the axios client with custom configuration. In this case, we are creating an instance called api with a baseURL from the VITE_API_URL environment variable and the withCredentials option set to true. This means that all requests made using this api instance will be sent to the specified base URL and will include any cookies associated with the domain, allowing for authentication and session management.
//api is an instance of the axios client that is configured with a base URL from the VITE_API_URL environment variable and the withCredentials option set to true. This means that all requests made using this api instance will be sent to the specified base URL and will include any cookies associated with the domain, allowing for authentication and session management.
//withcredentials: true is used to include cookies in cross-origin requests. This is important for authentication scenarios where the server sets a cookie (e.g., a session cookie) that needs to be sent back with subsequent requests to maintain the user's authenticated state. By setting withCredentials to true, the browser will include any cookies associated with the domain in the request, allowing the server to recognize the user and maintain their session.


export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data
        //response.data contains the data returned from the server after making the POST request to the /api/auth/register endpoint. This data could include information about the newly registered user, a success message, or any other relevant information sent by the server in response to the registration request.

    } catch (err) {

        console.log(err)

    }
}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        return response.data

    } catch (err) {
        console.log(err)
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {

    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        console.log(err)
    }

}