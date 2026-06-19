import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";

// the purpose of this file is to define the routes for our application using React Router. It creates a router object that maps different paths to their corresponding components. The router is then used in the App component to provide navigation and rendering of the appropriate pages based on the URL. This allows users to navigate between different pages of the application, such as login, registration, home, and interview pages, while maintaining a single-page application experience.


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path:"/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    }
])