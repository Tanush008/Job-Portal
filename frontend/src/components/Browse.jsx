import { useEffect } from 'react'
// import JobCard from './JobsCard'
import Navbar from './Navbar/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs';
// import { useDispatch, useSelector } from 'react-redux';
// import { setsearchedByQuery } from '@/redux/jobSlice';
import JobCard from './JobsCard';
import FilterPage from './FilterPage';
import { useDispatch, useSelector } from 'react-redux';
import { setsearchedByQuerys } from '@/redux/jobSlice';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.jobs);
    // console.log(allJobs);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setsearchedByQuerys(""));
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 px-4 ">
                <div className="grid grid-cols-4 gap-6">
                    {/* Left Side - Filters */}
                    <div className="col-span-1 bg-white shadow rounded-lg p-4 mt-10">
                        <FilterPage/>
                    </div>
                    {/* Right Side - Jobs */}
                    <div className="col-span-3 mt-10">
                        <h1 className="font-bold text-xl mb-6">
                            Search Results ({allJobs.length})
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {allJobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Browse;
// {
//     allJobs.map((job, index) => (
//         <div key={index} className='job-card'>
//             <h2>{job.title}</h2>
//             <p>{job.description}</p>
//             {/* Add more job details as needed */}
//         </div>
//     ))
// }