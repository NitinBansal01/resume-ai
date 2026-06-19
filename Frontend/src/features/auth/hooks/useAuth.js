import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

//the purpose of useAuth.js is to provide a custom hook that encapsulates the authentication logic and state management for the application. It allows components to easily access and interact with the authentication context, including user information, loading state, and functions for handling login, registration, and logout actions. By using this custom hook, components can manage authentication-related functionality in a clean and reusable way without having to directly interact with the context or API services.

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)// setLoading(true) is used to indicate that a login operation is in progress. This can be useful for showing a loading spinner or disabling the login button while the authentication request is being processed. Once the login operation is complete (either successful or failed), setLoading(false) is called in the finally block to indicate that the loading state has ended, allowing the UI to update accordingly.
        try {
            const data = await login({ email, password })
            setUser(data.user)
        } catch (err) {
        
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {

                const data = await getMe()
                setUser(data.user)
            } catch (err) { } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])
    // The useEffect hook is used to perform side effects in functional components. In this code, it is used to fetch the authenticated user's information when the AuthProvider component mounts. The getAndSetUser function is defined inside the useEffect hook and is responsible for making an API call to retrieve the user's data using the getMe function from the auth.api service. Once the data is fetched, it updates the user state with the retrieved user information and sets the loading state to false, indicating that the authentication state has been determined. The empty dependency array [] ensures that this effect runs only once when the component mounts, preventing unnecessary re-fetching of user data on subsequent renders.
    // useEffect is called repeatedly when the component re-renders, which can lead to multiple API calls and updates to the user state. By providing an empty dependency array [], we ensure that the effect runs only once when the component mounts, preventing unnecessary API calls and ensuring that the user state is set correctly without causing infinite loops or performance issues.
    

    return { user, loading, handleRegister, handleLogin, handleLogout }
}


