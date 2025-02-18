import React, { useEffect } from 'react'
// import JobCard from './JobsCard'
import Navbar from './Navbar/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useDispatch, useSelector } from 'react-redux';
import { setsearchedByQuery } from '@/redux/jobSlice';
import JobCard from './JobsCard';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.jobs);
    // console.log(allJobs);

    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setsearchedByQuery(""));
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <JobCard
                                    key={job._id} job={job} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Browse
// {
//     allJobs.map((job, index) => (
//         <div key={index} className='job-card'>
//             <h2>{job.title}</h2>
//             <p>{job.description}</p>
//             {/* Add more job details as needed */}
//         </div>
//     ))
// }