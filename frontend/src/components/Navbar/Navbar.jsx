import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import './Navbar.css'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'
// import { Popover } from '@radix-ui/react-popover'
const Navbar = () => {
    const user = false;
    return (
        <>
            <main>
                <div class='heading navbar'>
                    <h1>Job<span>Portal</span></h1>
                    <div className="navbar">
                        <ul class='list'>
                            <li>Home</li>
                            <li>Jobs</li>
                            <li>Browse</li>
                        </ul>
                        {
                            !user ? (
                                <div class="log">
                                    <Link to="/login"><Button class="outline">Login</Button></Link>
                                    <Link to="/signUp"><Button>Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar>
                                            <img src="https://github.com/shadcn.png" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div class="box">
                                            <div className="side-content">
                                                <Avatar class="mini-img">
                                                    <img src="https://github.com/shadcn.png" />
                                                </Avatar>
                                                <div className="text-content">
                                                    <h4>Tanush Agg</h4>
                                                    <p>Lorem, ipsum dolor.</p>
                                                </div>
                                            </div>
                                            <div class="button">
                                                <Button class="link_1">View Profile</Button>
                                                <Button class="link_2">Logout</Button>
                                            </div>
                                        </div>

                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div >
                </div >
            </main >
        </>
    )
}

export default Navbar


