import { useEffect, useState } from 'react'
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
import { setsearchedByQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs'

const HomeSection = () => {
    useGetAllJobs()
    const { user } = useSelector(store => store.auth)
    // console.log(user);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { searchedByQuerys, allJobs } = useSelector(store => store.jobs)
    // console.log(allJobs);
    const [searchInput, setSearchInput] = useState(searchedByQuerys || "")

    const LogoutButton = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Filter jobs based on search input
    const filteredJobs = allJobs?.filter(job =>
        job.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchInput.toLowerCase())
    ) || []
    const searchJobHandler = (e) => {
        e.preventDefault();
        dispatch(setsearchedByQuery(searchInput))
        // Optionally, navigate to a jobs page
        // navigate("/browse")
    }
    useEffect(() => {
        return () => {
            dispatch(setsearchedByQuery(""));
        }
    }, [])

    return (
        <>
            <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
                {/* Header */}
                <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md">
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
                        {
                            !user ? (
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
                                        <Avatar className='avatar px-2'>
                                            <img
                                                className='size-9 rounded-full'
                                                src={user?.profile?.profilePhoto || 'https://placehold.co/100x100'}
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
                    </nav>
                </header>
                {/* Search Section */}
                <div className="mt-10 w-full max-w-4xl text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Search for jobs...</h2>
                    <form onSubmit={searchJobHandler}>
                        <div className="flex items-center justify-center gap-4">
                        </div>
                        <input
                            type="text"
                            placeholder="Search for jobs..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                            Find Jobs
                        </button>
                    </form>
                    {/* Show filtered jobs or no job found */}
                    <div className="mt-8">
                        {searchInput && (
                            filteredJobs.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {filteredJobs.map(job => (
                                        <div key={job._id} className="bg-white p-4 rounded shadow flex flex-col items-start">
                                            <span className="font-bold text-lg">{job.title}</span>
                                            <span className="text-gray-600">{job.companyName}</span>
                                            <span className="text-gray-500 text-sm">{job.location}</span>
                                            <Link to={`/job/descrption/${job._id}`} className="mt-2 text-blue-600 hover:underline">View Details</Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-red-500 font-semibold">No job found</div>
                            )
                        )}
                    </div>
                </div>

                {/* Job Categories */}
                <div className="mt-10 w-full max-w-4xl">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Job Categories</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            "Software Development",
                            "Marketing",
                            "Finance",
                            "Healthcare",
                            "Neolists",
                            "Spouse",
                            "Codeops",
                            "Section",
                            "Wolus",
                            "Totems",
                        ].map((category, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-md hover:shadow-lg transition"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    {/* Placeholder for icons */}
                                    <span className="text-blue-600 font-bold text-lg">{category[0]}</span>
                                </div>
                                <p className="mt-2 text-gray-600 text-sm">{category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}
export default HomeSection