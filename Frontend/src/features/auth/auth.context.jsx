import { createContext,useEffect,useState } from "react";
import {getMe} from "./services/auth.api"
//the purpose of auth.context.jsx is to create a context for authentication in a React application. It defines an AuthContext using the createContext function from React, which allows us to share authentication-related data and functions across different components in the application without having to pass props down manually at every level. The AuthProvider component is a context provider that wraps around the children components and provides them with access to the authentication state (user and loading) and functions (setUser and setLoading) through the value prop of the AuthContext.Provider. This way, any component that consumes the AuthContext can access and update the authentication state as needed.

export const AuthContext = createContext()

//children is a special prop in React that allows components to pass their child elements to the parent component. In this case, the AuthProvider component is designed to wrap around other components (the children) and provide them with access to the authentication context. By using { children } as a parameter in the AuthProvider function, we can render any child components that are passed to it within the AuthContext.Provider, allowing those child components to access the authentication state and functions provided by the context.
//in easy language, children is a way for the AuthProvider component to wrap around other components and give them access to the authentication context. It allows us to use the AuthProvider as a wrapper around any components that need access to the authentication state and functions, making it easier to manage authentication across the application.
//if we dont use children, we would have to manually pass the authentication state and functions as props to every component that needs them, which can become cumbersome and lead to prop drilling (passing props through multiple levels of components). By using children, we can avoid this issue and provide a cleaner and more efficient way to share authentication data across the application.
//in app.js children will be the RouterProvider component and all its child components, that are every page and component that is rendered by the RouterProvider. By wrapping the RouterProvider with the AuthProvider, we ensure that all components rendered by the RouterProvider have access to the authentication context provided by the AuthProvider. This allows us to manage authentication state and functions in a centralized way and make them available to any component that needs them without having to pass props down manually.
export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)// user state is used to store the authenticated user's information. Initially, it is set to null, indicating that there is no authenticated user. When a user successfully logs in, the setUser function can be called to update the user state with the authenticated user's information, allowing other components in the application to access and display the user's data as needed. the set user function is called in the useAuth hook after a successful login to update the user state with the authenticated user's information.

    const [loading, setLoading] = useState(true)

    
    
   


    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}
        </AuthContext.Provider>
    )// returning format is the properties that can be used in any child component that is wrapped by the AuthProvider. The value prop of the AuthContext.Provider is an object that contains the user state, setUser function, loading state, and setLoading function. Any child component that consumes the AuthContext can access these properties and use them to manage authentication state and functions as needed.

    
}