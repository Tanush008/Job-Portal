import { Badge } from './ui/badge'
import React from 'react'
// import { Badge } from './ui/badge'

const LatestJobsCard = ({ job }) => {
    console.log(job.title);

    return (
        <>
            <div className='p-5 rounded-md border border-gray-100 cursor-pointer bg-white shadow-xl 
                transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-3 text-red-500'>
                <div>
                    <h1 className='font-bold text-lg'>{job?.company?.name}</h1>
                    <p className='text-md text-gray-500'>India</p>
                </div>
                <div>
                    <h1 className='font-semibold text-lg underline'>{job?.title}</h1>
                    <p> {job?.desc} </p>
                </div >
                <div className='flex gap-2 items-center mt-2'>
                    <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position} Positions</Badge>
                    <Badge className='text-blue-700 font-bold' variant='ghost'>Part Time</Badge>
                    <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.salary}LPA</Badge>
                    {/* <Badge variant="outline">Badge</Badge> */}

                </div>

            </div>
        </>
    )
}

export default LatestJobsCard