import  { useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import AuthTransition from './AuthTransition'
import SignUp from './signUp'
import { USER_API_END_POINT } from '../utils/constant'

const Login = () => {
    const [input, setinput] = useState({
        email: "",
        password: "",
        role: ""
    })
    const [errorMessage, setErrorMessage] = useState(""); 
    const EventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();
    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // clear old error msg
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate('/');
            }
        } catch (error) {
            // console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Invalid credentials. Please try again.");
            }
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <AuthTransition SignUpComponent={SignUp}>
            <div className="flex items-center mb-8">
                <span className="font-bold text-lg text-gray-700">JobPortal</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign in to JobPortal</h2>

            <form className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md" onSubmit={submitHandler}>
                <div className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className=" text-xl block font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            className="mt-1 block h-[40px] px-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={input.email}
                            onChange={EventHandler}
                            required
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-xl font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            className="mt-1 block w-full h-[40px] px-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={input.password}
                            onChange={EventHandler}
                            required
                        />
                    </div>

                    {/* Role Selection */}
                    <RadioGroup className="space-y-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Select Role</div>
                        <div className="flex space-x-6">
                            <div className="flex items-center">
                                <Input
                                    type="radio"
                                    name="role"
                                    id="recruiter"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={EventHandler}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <Label htmlFor="recruiter" className="ml-2 block text-sm text-gray-700">
                                    Recruiter
                                </Label>
                            </div>
                            <div className="flex items-center">
                                <Input
                                    type="radio"
                                    name="role"
                                    id="student"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={EventHandler}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <Label htmlFor="student" className="ml-2 block text-sm text-gray-700">
                                    Student
                                </Label>
                            </div>
                        </div>
                    </RadioGroup>

                    {/* 🔹 Error message display */}
                    {errorMessage && (
                        <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
                    )}

                    {/* Submit button */}
                    {loading ? (
                        <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            <Loader2 className="animate-spin mr-2" />
                            Please Wait
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-80 my-4 bg-teal-400 text-white font-bold rounded-full py-3 text-lg shadow-md hover:bg-teal-500 transition-all duration-200"
                        >
                            SIGN IN
                        </button>
                    )}
                </div>
            </form>
        </AuthTransition>
    )
}

export default Login
