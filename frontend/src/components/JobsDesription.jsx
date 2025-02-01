import React, { useDebugValue, useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from './utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
// import getSingleJobs from '@/hooks/getSingleJobs';

const JobsDesription = () => {
    const isApplied = true;
    const params = useParams();
    const jobId = params.id
    const dispatch = useDispatch()
    const { singleJob } = useSelector(store => store.jobs)
    const { user } = useSelector(store => store.auth)

    // getSingleJobs(jobId);
    useEffect(() => {
        const fetchSingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true
                })
                console.log(res.data);
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchSingleJobs()
    }, [jobId, dispatch, user?._id])
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Helllo</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'}>Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">Delhi</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.desc}</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Delhi</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem, ipsum.</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>4yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>44LPA</span></h1>
                {/* <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'></span></h1> */}
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>   
            </div>
        </div>
    )
}

export default JobsDesription