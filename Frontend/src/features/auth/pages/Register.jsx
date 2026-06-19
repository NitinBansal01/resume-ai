import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
    }

    if(loading){
        return (<main className='min-h-screen w-full flex justify-center items-center bg-[#0d1117]'><h1 className='text-2xl font-bold text-[#e6edf3]'>Loading.......</h1></main>)
    }

    return (
        <main className="min-h-screen w-full flex justify-center items-center bg-[#0d1117]">
            <div className="w-full max-w-md flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#e6edf3] mb-2">Create Account</h1>
                    <p className="text-sm text-[#7d8590]">Join us and start preparing for your interviews</p>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#161b22] border border-[#2a3348] rounded-lg p-6">

                    {/* Username Field */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-sm font-medium text-[#e6edf3]">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='your username'
                            className="border border-[#2a3348] bg-[#1e2535] text-[#e6edf3] placeholder-[#7d8590] px-4 py-3 rounded outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all" />
                    </div>

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

                    {/* Register Button */}
                    <button type="submit" className='border-none outline-none px-6 py-3 rounded-lg cursor-pointer transition-all active:scale-95 bg-gradient-to-br from-[#ff2d78] to-[#d91c60] text-white font-semibold hover:opacity-90 mt-2'>Create Account</button>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-[#7d8590]">Already have an account? <Link to={"/login"} className="text-[#ff2d78] font-semibold hover:text-[#ff4d8a] transition-colors">Sign in</Link></p>
            </div>
        </main>
    )
}

export default Register