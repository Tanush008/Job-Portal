import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
// import './signUp.css'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import axios, { Axios } from 'axios'
import { toast } from '@/hooks/use-toast'
import { USER_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setLoading } from '@/redux/authSlice'

const SignUp = () => {
    const [input, setinput] = useState({
        fullname: "",
        email: "",
        PhoneNumber: "",
        Password: "",
        file: "",
        role: ""
    })
    const navigate = useNavigate();
    const EventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const FileHandler = (e) => {
        setinput({ ...input, file: e.target.files?.[0] });
    }
    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("password", input.Password);
        formData.append("phoneNumber", input.PhoneNumber);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
                toast.error(error.response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <form className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg" onSubmit={submitHandler}>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                className="mt-1 block  h-[40px] px-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                type="text"
                                id="name"
                                name="fullname"
                                placeholder="Full Name"
                                required
                                value={input.fullname}
                                onChange={EventHandler}
                            />
                        </div>

                        <div>
                            <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                className="mt-1 block  h-[40px] px-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                type="text"
                                id="Phone"
                                name="PhoneNumber"
                                placeholder="Phone Number"
                                required
                                value={input.PhoneNumber}
                                onChange={EventHandler}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                className="mt-1 block  h-[40px] px-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={input.email}
                                onChange={EventHandler}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                className="mt-1 block  h-[40px] px-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                type="password"
                                id="password"
                                name="Password"
                                placeholder="Password"
                                required
                                value={input.Password}
                                onChange={EventHandler}
                            />
                        </div>

                        <RadioGroup className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="radio"
                                    name="role"
                                    id="recuriter"
                                    value="recuriter"
                                    checked={input.role === 'recuriter'}
                                    onChange={EventHandler}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="recuriter" className="text-sm font-medium text-gray-700">Recruiter</label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="radio"
                                    name="role"
                                    id="student"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={EventHandler}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="student" className="text-sm font-medium text-gray-700">Student</label>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="profile" className="block text-sm font-medium text-gray-700">Profile</label>
                                <input
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    accept="image/*"
                                    type="file"
                                    id="profile"
                                    name="file"
                                    required
                                    onChange={FileHandler}
                                />
                            </div>
                        </RadioGroup>

                        {loading ? (
                            <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center">
                                <Loader2 className="animate-spin mr-2" />Please Wait
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign Up
                            </button>
                        )}

                        <p className="text-center text-sm text-gray-600">
                            Already have an Account?{' '}
                            <Link className="font-medium text-indigo-600 hover:text-indigo-500" to="/login">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp