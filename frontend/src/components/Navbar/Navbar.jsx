import { Avatar } from '@radix-ui/react-avatar'
// import './Navbar.css'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
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
                <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-white shadow-md z-50">
                    <Link to="/">
                        <h1 className="text-xl font-bold text-blue-600">JobConnect</h1>
                    </Link>
                    <nav className="flex items-center gap-4">
                        <ul className='flex font-medium items-center gap-5'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li><Link to="/admin/companies">Companies</Link></li>
                                        <li><Link to="/admin/jobs">Jobs</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/browse">Browse</Link></li>
                                    </>
                                )
                            }
                        </ul>
                        {!user ? (
                            <div className="log flex gap-10 items-center">
                                <Link to="/next/login">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                        Sign In
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="avatar px-2">
                                        <img
                                            className="size-9 rounded-full"
                                            src={user?.profile?.profilePhoto || "https://placehold.co/100x100"}
                                            alt="profile"
                                        />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="box">
                                        <div className="side-content flex items-center gap-3">
                                            <Avatar>
                                                <img
                                                    className="size-10 rounded-full"
                                                    src={user?.profile?.profilePhoto}
                                                    alt="profile"
                                                />
                                            </Avatar>
                                            <div className="text-content">
                                                <h4>{user?.fullname}</h4>
                                                <p>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div>
                                            {user?.role === "student" && (
                                                <Button className="flex mb-2 mt-2">
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            )}
                                            <Button className="flex" onClick={LogoutButton}>
                                                Logout
                                            </Button>
                                            {user?.role === "student" && (
                                                <Button className="flex mb-2 mt-2">
                                                    <Link to="/save_for_later">Save for later</Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </nav>
                </header>
            </main >
        </>
    )
}

export default Navbar