import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import './signUp.css'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { toast } from '@/hooks/use-toast'
import { USER_API_END_POINT } from '../utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setinput] = useState({
        email: "",
        password: "",
        role: ""
    })
    const EventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    // const FileHandler = (e) => {
    //     setinput({ ...input, file: e.target.files?.[0] });
    // }
    const navigate = useNavigate();
    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))  
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
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
                    <h1>Login</h1>
                    <div class="full_name">
                        <Label for="email">Email</Label>
                        <Input class="name" type="email" id="email" name="email" placeholder="Email"
                            value={input.email}
                            onChange={EventHandler}
                            required />
                    </div>
                    <div class="full_name">
                        <Label for="name">Password</Label>
                        <Input class="name" type="password" id="password" name="password" placeholder="Password" required
                            value={input.password}
                            onChange={EventHandler} />
                    </div>
                    <RadioGroup class="option">
                        <div>
                            <Input type="radio" name="role" id="recuriter" value="recuriter"
                                checked={input.role === 'recuriter'}
                                onChange={EventHandler} />
                            <Label for="recuriter">Recuriter</Label>
                        </div>
                        <div>
                            <Input type="radio" name="role" id="student" value="student"
                                checked={input.role === 'student'}
                                onChange={EventHandler} />
                            <Label for="student">Student</Label>
                        </div>
                    </RadioGroup>
                    {
                        loading ? <Button><Loader2 />Please Wait</Button> : <Button type="submit" class="signup">Log In</Button>
                    }
                    <span>Don't have Account?<Link class="login" to="/signUp">SignUp</Link></span>
                </form>
            </div>
        </>
    )
}

export default Login