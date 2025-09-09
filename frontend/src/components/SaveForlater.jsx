import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { removeSaveForLater } from '@/redux/jobSlice';

const SaveForlater = () => {
    const { saveForlater } = useSelector(store => store.jobs)
    const dispatch = useDispatch()
    // console.log(saveForlater);
    const navigate = useNavigate()
    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Saved Jobs</h2>
            {saveForlater.length === 0 ? (
                <div className="text-gray-500">No jobs saved for later.</div>
            ) : (
                <div className="grid grid-cols-1 gap-4 ">
                    {saveForlater.map((job, idx) => (
                        <div key={job._id || idx} className="bg-white p-4 rounded shadow flex flex-col items-start">
                            <span className="font-bold text-lg">{job.title}</span>
                            <span className="text-gray-600">{job.company?.name}</span>
                            <span className="text-gray-500 text-sm">{job.location}</span>
                            <p className="mt-2 text-gray-700">{job.desc}</p>
                            <div className='flex gap-4'>
                                <Button variant="outline" onClick={() => dispatch(removeSaveForLater(job._id))} className='text-white mt-5'>Remove</Button>
                                {/* {console.log(job._id)}; */}
                                <Button variant="outline" onClick={() => navigate(`/job/descrption/${job?._id}`)} className='text-white mt-5'>Details</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SaveForlater