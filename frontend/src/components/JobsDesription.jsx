import {  useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICANT_END_POINT, JOB_API_END_POINT } from './utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
// import getSingleJobs from '@/hooks/getSingleJobs';

const JobsDesription = () => {
    const { user } = useSelector(store => store.auth)
    const params = useParams();
    const jobId = params.id
    const dispatch = useDispatch()
    const { singleJob } = useSelector(store => store.jobs)
    const intialApply = singleJob?.application?.some(application => application.applicant === user?._id) || false;
    console.log(intialApply);
    const [isApplied, setApplied] = useState(intialApply)
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICANT_END_POINT}/apply/${jobId}`, {
                withCredentials: true,
            })
            console.log("ffadfddfgagfa");
            console.log(res.data);
            if (res.data.success) {
                setApplied(true)
                const updateSingleJob = { ...singleJob, application: [...singleJob.application, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJob))
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                    setApplied(res.data.job.application.some(application => application.applicant === user?._id))
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
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.application?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobsDesription