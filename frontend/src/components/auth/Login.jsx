import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import './signUp.css'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const Login = () => {
    const [input, setinput] = useState({
        email: "",
        Password: "",
        role: ""
    })
    return (
        <>
            <Navbar />
            <div class="main">
                <form class="form" action="">
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
                        <Input class="name" type="text" id="password" name="password" placeholder="Password" required
                            value={input.Password}
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
                    <Button type="submit" class="signup">SignUp</Button>
                    <span>Don't have Account?<Link class="login" to="/signUp">Login</Link></span>
                </form>
            </div>
        </>
    )
}

export default Login