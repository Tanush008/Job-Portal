import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { RadioGroup } from '@radix-ui/react-radio-group'

const auth = () => {
    const [input, setinput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        Password: "",
        file: "",
        role: ""
    })
    const navigate = useNavigate();
    const { loading, user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const EventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const FileHandler = (e) => {
        setinput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("password", input.Password);
        formData.append("phoneNumber", input.phoneNumber);
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
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Red and yellow geometric background shapes */}
            <div className="absolute top-0 right-0 w-80 h-80 z-0" style={{
                background: '#F06273',
                clipPath: 'polygon(100% 0, 0 40%, 100% 100%)'
            }}></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 z-0" style={{
                background: '#FF8A65',
                clipPath: 'polygon(0 100%, 100% 60%, 0 0)'
            }}></div>
            {/* Card */}
            <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden z-10 min-h-[500px]">
                {/* Left Side - Welcome Back */}
                <div className="w-1/2 bg-teal-400 flex flex-col items-center justify-center p-10 relative">
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
                        <p className="text-white mb-8 text-center">
                            To keep connected with us please<br />login with your personal info
                        </p>
                        <button
                            onClick={() => { window.location.href = '/next/login'; }}
                            className="border border-white text-white px-8 py-2 rounded-full font-semibold hover:bg-white hover:text-teal-500 transition bg-transparent"
                        >
                            SIGN IN
                        </button>
                    </div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400 rounded-full -mb-16 -ml-16 opacity-70"></div>
                </div>
                <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    <form className="max-w-md w-full mb-5 space-y-3 bg-white p-8 rounded-xl shadow-lg relative z-10" onSubmit={submitHandler}>
                        <div className="space-y-2">
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
                                        id="recruiter"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={EventHandler}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="recruiter" className="text-sm font-medium text-gray-700">Recruiter</label>
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

                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :
                                    <button
                                        type="submit"
                                        className="w-80 my-4 bg-teal-400 text-white font-bold rounded-full py-3 text-lg shadow-md hover:bg-teal-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2"
                                    >
                                        SIGN UP
                                    </button>
                            }


                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default auth