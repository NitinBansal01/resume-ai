import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()// useNavigate is a hook provided by the react-router library that allows us to programmatically navigate to different routes in our application. In this case, we will use it to navigate to the home page ("/") after a successful login.


    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    //two-way binding is a concept in React where the state of a component is synchronized with the input fields in the UI. In this code, we have two state variables, email and password, which are initialized to empty strings. The onChange event handlers for the input fields update these state variables whenever the user types into the fields. This allows us to keep track of the current values of the email and password inputs, which can then be used when the user submits the form to perform the login action.

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email,password})
        navigate('/')
    }// handlesubmit function is used to handle the form submission event. It prevents the default form submission behavior, calls the handleLogin function with the email and password values, and then navigates to the home page ("/") after successful login.
    // The handleLogin function is likely defined in the useAuth hook and is responsible for performing the actual login logic, such as making an API request to authenticate the user.
    //why dont we handlelogin directly in the onsubmit event of the form?
    // We don't handle the login directly in the onSubmit event of the form because we want to perform additional actions after the login is successful. By using a separate handleSubmit function, we can first call handleLogin to authenticate the user and then navigate to the home page ("/") only if the login is successful. This allows us to have better control over the flow of the application and handle any potential errors or loading states before navigating away from the login page.
    if(loading){
        return (<main className='min-h-screen w-full flex justify-center items-center bg-[#0d1117]'><h1 className='text-2xl font-bold text-[#e6edf3]'>Loading.......</h1></main>)
    }


    return (
        <main className="min-h-screen w-full flex justify-center items-center bg-[#0d1117]">
            <div className="w-full max-w-md flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#e6edf3] mb-2">Welcome Back</h1>
                    <p className="text-sm text-[#7d8590]">Sign in to your account to continue</p>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#161b22] border border-[#2a3348] rounded-lg p-6">
                    {/* Email Field */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-[#e6edf3]">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='you@example.com'
                            className="border border-[#2a3348] bg-[#1e2535] text-[#e6edf3] placeholder-[#7d8590] px-4 py-3 rounded outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all" />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium text-[#e6edf3]">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='••••••••'
                            className="border border-[#2a3348] bg-[#1e2535] text-[#e6edf3] placeholder-[#7d8590] px-4 py-3 rounded outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all" />
                    </div>

                    {/* Login Button */}
                    <button type="submit" className='border-none outline-none px-6 py-3 rounded-lg cursor-pointer transition-all active:scale-95 bg-gradient-to-br from-[#ff2d78] to-[#d91c60] text-white font-semibold hover:opacity-90 mt-2'>Login</button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-[#7d8590]">Don't have an account? <Link to={"/register"} className="text-[#ff2d78] font-semibold hover:text-[#ff4d8a] transition-colors">Register here</Link></p>
            </div>
        </main>
    )
}

export default Login