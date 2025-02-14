import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react'

const UpdateProfile = ({ open, setOpen }) => {
    // const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/Update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            // console.log(res.data);
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                // toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
        // console.log(input);
    }

    return (
        <div>
            <Dialog open={open} >
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader className='text-white'>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler} className=''>
                        <div className='grid grid-cols-4 items-center gap-4 mb-4'>
                            <label htmlFor="name" className="text-right text-blue-600">Name</label>
                            <input
                                id="name"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="col-span-3 p-2 border border-blue-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 mb-4'>
                            <label htmlFor="email" className="text-right text-blue-600">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="col-span-3 p-2 border border-blue-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 mb-4'>
                            <label htmlFor="phoneNumber" className="text-right text-blue-600">Number</label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="col-span-3 p-2 border border-blue-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 mb-4'>
                            <label htmlFor="bio" className="text-right text-blue-600">Bio</label>
                            <input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="col-span-3 p-2 border border-blue-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 mb-4'>
                            <label htmlFor="skills" className="text-right text-blue-600">Skills</label>
                            <input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="col-span-3 p-2 border border-blue-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 mb-4'>
                            <label htmlFor="file" className="text-right text-blue-600">Resume</label>
                            <input
                                id="file"
                                name="file"
                                type="file"
                                accept="image/*"
                                onChange={fileChangeHandler}
                                className="col-span-3 p-2 border border-blue-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfile;