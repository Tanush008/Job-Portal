// import React from 'react'
import LatestJobsCard from './LatestJobsCard'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import Jobs from './Jobs'

const randomJobs = ['1', '2', '3', '4', '5', '7', '6', '9']
const LatesJobs = () => {
    const { allJobs } = useSelector(store => store.jobs)
    // console.log(randomJobs.length);

    // console.log(allJobs.length);

    return (
        <>
            <div className='max-w-7xl mx-auto my-20'>
                <h1 className='text-4xl font-bold'>Latest<span className='text-[#6A38C2]'> Top & </span>Openings</h1>
                <div className='grid grid-cols-3 gap-4 my-5'>
                    {
                        !allJobs || !Array.isArray(allJobs) || allJobs.length === 0
                            ? <span>No jobs found</span>
                            : allJobs.slice(0, 2).map((jobs) => <LatestJobsCard key={jobs._id} job={jobs} />)
                    }
                </div>
            </div>
        </>
    )
}

export default LatesJobs