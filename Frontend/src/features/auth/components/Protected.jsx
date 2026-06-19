import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

// protected component is used to protect certain routes in the application that require authentication. It checks if the user is authenticated (i.e., if there is a valid user object in the authentication context) and if the authentication state is still loading. If the authentication state is loading, it displays a loading message. If the user is not authenticated, it redirects them to the login page. If the user is authenticated, it renders the child components passed to it, allowing access to the protected route. This way, we can ensure that only authenticated users can access certain parts of the application while unauthenticated users are redirected to the login page.
const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected