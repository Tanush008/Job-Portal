// import { MoreHorizontal, Table } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
// import { Popover } from '@mui/material';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from '../ui/avatar';
import { Popover } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
// import store from '@/redux/store';

const AdminJobsTable = () => {
    const { adminJobs, searchJobByText } = useSelector(store => store.jobs);
    const [filterjobs, setFilterjobs] = useState(adminJobs);
    const navigate = useNavigate();
    useEffect(() => {
        const filteredjobs = adminJobs.length >= 0 && adminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        });
        setFilterjobs(filteredjobs);
    }, [adminJobs, searchJobByText])
    return (
        <div >
            <Table>
                <TableCaption>A list of your recent Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterjobs?.map((job) => (
                            <tr >
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer gap-30 ">
                                    <Popover>
                                        <PopoverTrigger className='mb-5'><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">

                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2  w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable