import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
// import './Navbar.css'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { USER_API_END_POINT } from '../utils/constant'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
// import { Popover } from '@radix-ui/react-popover'
const Navbar = () => {
    // const user = false;
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const LogoutButton = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/ ")
            }
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(user);

    return (
        <>
            <main>
                <div className='heading navbar py-5  flex items-center justify-between  text-black px-10 border-b-2 border-black'>
                    <h1 className='text-[1.5rem]'>JobPortal</h1>
                    <ul className='flex gap-20 text-[22px] font-semibold'>
                        {user?.role === 'recruiter' ? (
                            <>
                                <Link to='/admin/companies' className="hover:text-blue-500 transition-colors duration-300">Companies</Link>
                                <Link to='/admin/jobs' className="hover:text-blue-500 transition-colors duration-300">Jobs</Link>
                            </>
                        ) : (
                            <>
                                <Link to={'/'} className="hover:text-blue-500 hover:scale-110 transition-all duration-300">Home</Link>
                                <Link to={'/jobs'} className="hover:text-blue-500  hover:scale-110 transition-colors duration-300">Jobs</Link>
                                <Link to={'/browse'} className="hover:text-blue-500  hover:scale-110 transition-colors duration-300">Browse</Link>
                            </>
                        )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className="log flex gap-10 items-center">
                                <Link to="/login"><Button >Login</Button></Link>
                                <Link to="/signUp"><Button>SignIn</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='px-2'>
                                        <img
                                            className='size-9 rounded-md'
                                            src={user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}
                                            alt="@shadcn"
                                        />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div class="box">
                                        <div className="side-content">
                                            <Avatar class="mini-img">
                                                <img className='size-10 rounded-md' src={user?.profile?.profilePhoto} />
                                            </Avatar>
                                            <div className="text-content">
                                                <h4>{user?.fullname}</h4>
                                                <p>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                user && user?.role === 'student' && (
                                                    <Button className='flex mb-2 mt-2'><Link to='/profile'>View Profile</Link></Button>
                                                )
                                            }
                                            <Button className='flex' onClick={LogoutButton}>Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </main >
        </>
    )
}

export default Navbar