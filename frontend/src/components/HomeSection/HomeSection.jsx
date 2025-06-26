import React, { useState } from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
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
import './HomeSection.css';
// import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { Carousel, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { CarouselItem } from '../ui/carousel'
import { CarouselContent } from '../ui/carousel'
import { setsearchedByQuery } from '@/redux/jobSlice';
const category = ['Software Engineer', 'Backend Developer', 'FrontEnd Developer',
    'Graphic Designer', 'Data Science']
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
    // const searchJobHandler = () => {
    //     dispatch(setsearchedByQuery(query))
    //     navigate("/browse")
    // }
    return (
        <>
            <body>
                <div className="container">
                    <div className="box"></div>
                    <div className='heading navbar px-[80px] pt-[40px] py-[10px] flex items-center justify-between '>
                        <h1 className='text-[2.2rem]'>Job<span className='text-blue-600'>Portal</span></h1>
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

                    <div>
                        <Carousel className='w-full max-w-xl mx-auto my-20 text-red-400'>

                            <CarouselContent  >
                                {
                                    category.map((catg, index) => (
                                        <CarouselItem className='md:basis-1/2 lg-basis-1/3'>
                                            <Button onClick={() => searchJobHandler(catg)} className='rounded-full' variant="outline">{catg}</Button>
                                        </CarouselItem>
                                    ))
                                }
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </body>
        </>
    )
}
export default HomeSection      