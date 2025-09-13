/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar'
import { useDispatch } from 'react-redux'
import { addSaveForLater } from '@/redux/jobSlice'

const JobCard = ({ job }) => {
    // console.log(job);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMsg, setShowMsg] = useState(false);

    const dayTime = (mongoDbTime) => {
        const createdAt = new Date(mongoDbTime);
        const currentDate = new Date();
        const diff = currentDate - createdAt
        return Math.floor(diff / (1000 * 24 * 60 * 60))
    }

    const handleSaveForLater = () => {
        dispatch(addSaveForLater(job));
        setShowMsg(true);
        setTimeout(() => setShowMsg(false), 1500);
        // Optionally navigate to the save for later page:
        // navigate('/save_for_later');
    }

    return (
        <div className='relative p-5 rounded-md shadow-xl bg-white border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-3 cursor-pointer'>
            {showMsg && (
                <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded shadow z-10 text-sm">
                    Saved for later
                </div>
            )}
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-600'>{dayTime(job?.createdAt) === 0 ? "Today" : `${dayTime(job?.createdAt)}days ago`}</p>
                <Button className='rounded-full' size='icon'><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' size='icon'>
                    <Avatar>
                        <AvatarImage src={job.company.Logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-bold text-lg'>{job?.company?.name}</h1>
                    <p className='text-md text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-gray-600 text-sm'>{job?.desc}!</p>
            </div>
            <div className='flex gap-2 items-center mt-2'>
                <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position} Positions</Badge>
                {/* <Badge className='text-blue-700 font-bold' variant='ghost'>Part Time</Badge> */}
                <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.salary}INR</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline" onClick={() => navigate(`/job/descrption/${job?._id}`)} className='text-white'>Details</Button>
                <button className='w-50 h-30 py-2 px-3 rounded-md text-center text-white bg-black hover:bg-gray-500' onClick={handleSaveForLater}>Save For Later</button>
            </div>
        </div>
    )
}

export default JobCard