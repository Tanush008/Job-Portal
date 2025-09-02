import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "./utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

// eslint-disable-next-line react/prop-types
const UpdateProfile = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        profilePhoto: null, // For profile picture
        resume: null,       // For resume
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const profilePhotoChangeHandler = (e) => {
        const profilePhoto = e.target.files?.[0];
        setInput({ ...input, profilePhoto });
    };

    const resumeChangeHandler = (e) => {
        const resume = e.target.files?.[0];
        setInput({ ...input, resume });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }
        if (input.resume) {
            formData.append("resume", input.resume);
        }

        try {
            setLoading(true);
            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                setOpen(false);
                toast({
                    title: "Success 🎉",
                    description: res.data.message || "Profile updated successfully!",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error ❌",
                description: error.response?.data?.message || "Failed to update profile.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="sm:max-w-[500px] bg-white rounded-lg shadow-lg"
                onInteractOutside={() => setOpen(false)}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-800">
                        Update Profile
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} className="space-y-6">
                    {/* Full Name */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="fullname" className="text-right text-gray-600">
                            Full Name
                        </label>
                        <input
                            id="fullname"
                            name="fullname"
                            type="text"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className="col-span-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email" className="text-right text-gray-600">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="col-span-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="phoneNumber" className="text-right text-gray-600">
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className="col-span-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Bio */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="bio" className="text-right text-gray-600">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            className="col-span-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            placeholder="Write a short bio"
                        />
                    </div>

                    {/* Skills */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="skills" className="text-right text-gray-600">
                            Skills
                        </label>
                        <input
                            id="skills"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            className="col-span-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            placeholder="Enter your skills (comma-separated)"
                        />
                    </div>

                    {/* Profile Photo */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="profilePhoto" className="text-right text-gray-600">
                            Profile Photo
                        </label>
                        <input
                            id="profilePhoto"
                            name="profilePhoto"
                            type="file"
                            accept="image/*"
                            onChange={profilePhotoChangeHandler}
                            className="col-span-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                    </div>

                    {/* Resume */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="resume" className="text-right text-gray-600">
                            Resume
                        </label>
                        <input
                            id="resume"
                            name="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={resumeChangeHandler}
                            className="col-span-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                    </div>

                    {/* Submit Button */}
                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </Button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full my-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-all duration-300"
                            >
                                Update Profile
                            </button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};  

export default UpdateProfile;
