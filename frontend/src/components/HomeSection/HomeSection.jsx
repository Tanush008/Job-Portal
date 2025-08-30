import  { useState } from 'react'
import { Avatar } from '@radix-ui/react-avatar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '../utils/constant'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import './HomeSection.css';
import { FaLock, FaUserTie, FaLaptopCode, FaDatabase, FaChartLine, FaCode } from "react-icons/fa6";
import { Carousel, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { CarouselItem } from '../ui/carousel'
import { CarouselContent } from '../ui/carousel'
import { setsearchedByQuery } from '@/redux/jobSlice';

const category = [
    { name: 'Software Engineer', icon: <FaLaptopCode /> },
    { name: 'Backend Developer', icon: <FaDatabase /> },
    { name: 'FrontEnd Developer', icon: <FaCode /> },
    { name: 'Graphic Designer' },
    { name: 'Data Science', icon: <FaChartLine /> }
];

const HomeSection = () => {
    const [query, setQuery] = useState("")
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

    const searchJobHandler = (catg) => {
        dispatch(setsearchedByQuery(catg))
        navigate("/browse")
    }

    return (
        <>
            <body>
                <div className="container">
                    <div className="boxs"></div>
                    <div className='heading flex navbar px-[80px] pt-[40px] py-[10px] justify-between items-center'>
                        <h1 className='text-[2.2rem] flex items-center gap-2'>
                            <FaUserTie className="text-[#97d700] text-4xl" />
                            JobPortal
                        </h1>
                        <ul className='flex gap-20 text-[20px] font-semibold'>
                            {user?.role === 'recruiter' ? (
                                <>
                                    <Link to='/admin/companies'>Companies</Link>
                                    <Link to='/admin/jobs'>Jobs</Link>
                                </>
                            ) : (
                                <>
                                    <Link to={'/'}>Home</Link>
                                    <Link to={'/jobs'}>Jobs</Link>
                                    <Link to={'/browse'}>Browse</Link>
                                </>
                            )}
                        </ul>
                        {
                            !user ? (
                                <div className="log flex gap-10 items-center">
                                    <Link to="/next/login">
                                        <button className="flex items-center gap-2 bg-[#97d700] hover:bg-[#7bb900] text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200">
                                            <FaLock />
                                            Log In
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className='avatar px-2'>
                                            <img
                                                className='size-9 rounded-full'
                                                src={user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}
                                                alt="@shadcn"
                                            />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="box">
                                            <div className="side-content flex items-center gap-3">
                                                <Avatar>
                                                    <img className='size-10 rounded-full' src={user?.profile?.profilePhoto} />
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
                    <div className='content flex flex-col items-center justify-center mt-12'>
                        <div className='text-center'>
                            <h2 className='mb-[10px] text-[3.2rem] text-white w-full font-extrabold'>The Easiest Way To Get Your Dream Job</h2>
                            <p className='text-[1.1rem] text-gray-300 mb-8'>Find your next opportunity with top companies. Discover jobs tailored for you.</p>
                            <Button className="get-started-btn" onClick={() => navigate('/jobs')}>Get Started</Button>
                        </div>
                    </div>
                    <div>
                        <Carousel className='carousel w-full max-w-xl mx-auto my-20 text-white'>
                            <CarouselContent>
                                {
                                    category.map((catg, index) => (
                                        <CarouselItem className='md:basis-1/2 lg-basis-1/3' key={catg.name}>
                                            <Button
                                                onClick={() => searchJobHandler(catg.name)}
                                                className='rounded-full flex items-center gap-2'
                                                variant="outline"
                                            >
                                                {catg.icon}
                                                {catg.name}
                                            </Button>
                                        </CarouselItem>
                                    ))
                                }
                            </CarouselContent>
                            <CarouselPrevious className="carousel-arrow" />
                            <CarouselNext className="carousel-arrow" />
                        </Carousel>
                    </div>
                </div>
            </body>
        </>
    )
}
export default HomeSection