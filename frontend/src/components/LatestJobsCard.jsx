import { Badge } from './ui/badge'
import React from 'react'
// import { Badge } from './ui/badge'

const LatestJobsCard = () => {
    return (
        <>
            <div className='p-5 rounded-md border border-gray-100 cursor-pointer bg-white shadow-xl 
                transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-3'>
                <div>
                    <h1 className='font-bold text-lg'>Company Name</h1>
                    <p className='text-md text-gray-500'>India</p>
                </div>
                <div>
                    <h1 className='font-semibold text-lg underline'>Job Title</h1>
                    <p>Levenietta est vel voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, consectetur id? Itaque officia error temporibus numquam ex consequatur placeat ut illum </p>
                </div >
                <div className='flex gap-2 items-center mt-2'>
                    <Badge className='text-blue-700 font-bold' variant='ghost'>12 Positions</Badge>
                    <Badge className='text-blue-700 font-bold' variant='ghost'>Part Time</Badge>
                    <Badge className='text-blue-700 font-bold' variant='ghost'>34LPA</Badge>
                    {/* <Badge variant="outline">Badge</Badge> */}

                </div>

            </div>
        </>
    )
}

export default LatestJobsCard