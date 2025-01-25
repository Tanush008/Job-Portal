import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import {  Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'

const JobCard = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100  transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-3 cursor-pointer'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-600'>2 days ago</p>
                <Button className='rounded-full' size='icon'><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' size='icon'>
                    <Avatar>
                        <AvatarImage src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-5746111ce930e4340aa34a9eb626a302_screen.jpg?ts=1671431883" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-bold text-lg'>Company Name</h1>
                    <p className='text-md text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-gray-600 text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, hic!</p>
            </div>
            <div className='flex gap-2 items-center mt-2'>
                <Badge className='text-blue-700 font-bold' variant='ghost'>12 Positions</Badge>
                <Badge className='text-blue-700 font-bold' variant='ghost'>Part Time</Badge>
                <Badge className='text-blue-700 font-bold' variant='ghost'>34LPA</Badge>
                {/* <Badge variant="outline">Badge</Badge> */}

            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline" className='text-white'>Details</Button>
                <Button className='bg-[#7209b7]'>Save For Later</Button>
            </div>
        </div>
    )
}

export default JobCard