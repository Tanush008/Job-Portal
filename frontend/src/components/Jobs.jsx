import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar'
import FilterPage from './FilterPage'
import JobCard from './JobsCard'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
// const RandomJobs = [1, 2, 3, 4, 5, 6, 7, 8]
const Jobs = () => {
    const { allJobs, searchedByQuery } = useSelector(store => store.jobs)
    console.log(searchedByQuery);
    // console.log(allJobs);
    // console.log(allJobs.title);

    const [filterJobs, setFilterJobs] = useState(allJobs);
    useEffect(() => {
        if (searchedByQuery) {
            const filteredJobs = allJobs.filter((Jobs) => {
                // console.log(allJobs.title.toLowerCase());
                const title = Jobs.title ? Jobs.title.toLowerCase() : '';
                console.log(title);
                const description = Jobs.description ? Jobs.description.toLowerCase() : '';
                const location = Jobs.location ? Jobs.location.toLowerCase() : '';
                return title.includes(searchedByQuery.toLowerCase()) ||
                    description.includes(searchedByQuery.toLowerCase()) ||
                    location.includes(searchedByQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedByQuery]);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 '>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterPage />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job Not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (

                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}>
                                                <JobCard job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs