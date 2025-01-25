import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import './signUp.css'
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
            <div class="main">
                <form class="form" onSubmit={submitHandler}>
                    <h1>Sign Up</h1>
                    <div class="full_name">
                        <Label for="name">Full Name</Label>
                        <Input class="name" type="text" id="name" name="fullname" placeholder="Full Name" required
                            value={input.fullname}
                            onChange={EventHandler}
                        />
                    </div>
                    <div class="full_name">
                        <Label for="Phone">Phone Number</Label>
                        <Input class="name" type="text" id="Phone" name="PhoneNumber" placeholder="Phone Number" required
                            value={input.PhoneNumber}
                            onChange={EventHandler} />
                    </div>
                    <div class="full_name">
                        <Label for="email">Email</Label>
                        <Input class="name" type="email" id="email" name="email" placeholder="Email" required
                            value={input.email}
                            onChange={EventHandler} />
                    </div>
                    <div class="full_name">
                        <Label for="name">Password</Label>
                        <Input class="name" type="password" id="password" name="Password" placeholder="Password" required
                            value={input.Password}
                            onChange={EventHandler} />
                    </div>
                    <RadioGroup class="option">
                        <div>
                            <Input type="radio" name="role" id="recuriter" value="recuriter"
                                checked={input.role === 'recuriter'}
                                onChange={EventHandler}
                            />
                            <Label for="recuriter">Recuriter</Label>
                        </div>
                        <div>
                            <Input type="radio" name="role" id="student" value="student"
                                checked={input.role === 'student'}
                                onChange={EventHandler} />
                            <Label for="student">Student</Label>
                        </div>
                        <div class="profile">
                            <Label for="profile">Profile</Label>
                            <Input class="profile" accept="image/*" type="file" id="profile" name="name"
                                placeholder="Full Name" required
                                onChange={FileHandler} />
                        </div>
                    </RadioGroup>{
                        loading ? <Button><Loader2 />Please Wait</Button> : <Button type="submit" class="signup">Sign in</Button>
                    }
                    <span>Already have Account?<Link class="login" to="/login">Login</Link></span>
                </form>
            </div>
        </>
    )
}

export default SignUp