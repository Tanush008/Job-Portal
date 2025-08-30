import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_END_POINT } from "../utils/constant";
import { useSelector } from "react-redux";
import useGetAllSingleCompany from "@/hooks/useGetAllSingleCompany";

const CompanySetup = () => {
    const params = useParams();
    useGetAllSingleCompany(params.id);
    const [input, setInput] = useState({
        name: "",
        desc: "",
        website: "",
        location: "",
    });
    const [file, setFile] = useState(null); // Separate state for the file
    const { singleCompany } = useSelector((store) => store.company);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("desc", input.desc);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (file) { 
            formData.append("file", file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            // console.log(res.data);
            if (res.data.success) {
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "An error occurred while registering the company.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            desc: singleCompany.desc || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
        });
        setFile(null); // Reset the file input
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-6 bg-white">
                <form onSubmit={submitHandler}>
                    <div className="flex items-center gap-5 p-8 bg-white">
                        <button
                            onClick={() => navigate("/admin/companies")}
                            className="flex w-30 py-2 rounded-xl px-5 hover:bg-green-800 text-center items-center gap-2 text-white bg-[#97d700] font-medium"
                        >
                            <ArrowLeft />
                            <span className="text-white">Back</span>
                        </button>
                        <h1 className="font-bold text-xl">Company Setup</h1>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <div>
                            <Label>Company Name</Label>
                            <input
                                className="w-full bg-gray-100 h-10 rounded-md px-4 border-2 border-gray-200 focus:border-[#97d700] focus:ring-2 focus:ring-[#97d70033] transition-all duration-200 outline-none shadow-sm placeholder-gray-400"
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="Enter company name"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <input
                                className="w-full bg-gray-100 h-10 rounded-md px-4 border-2 border-gray-200 focus:border-[#97d700] focus:ring-2 focus:ring-[#97d70033] transition-all duration-200 outline-none shadow-sm placeholder-gray-400"
                                type="text"
                                name="desc"
                                value={input.desc}
                                onChange={changeEventHandler}
                                placeholder="Enter description"
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <input
                                className="w-full bg-gray-100 h-10 rounded-md px-4 border-2 border-gray-200 focus:border-[#97d700] focus:ring-2 focus:ring-[#97d70033] transition-all duration-200 outline-none shadow-sm placeholder-gray-400"
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                placeholder="Enter website"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <input
                                className="w-full bg-gray-100 h-10 rounded-md px-4 border-2 border-gray-200 focus:border-[#97d700] focus:ring-2 focus:ring-[#97d70033] transition-all duration-200 outline-none shadow-sm placeholder-gray-400"
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="Enter location"
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            {singleCompany.Logo && (
                                <img
                                    src={singleCompany.Logo}
                                    alt="Company Logo"
                                    className="w-20 h-20 object-cover mb-2"
                                />
                            )}
                            <input
                                className="w-full bg-gray-100 h-10 rounded-md px-4 border-2 border-gray-200 focus:border-[#97d700] focus:ring-2 focus:ring-[#97d70033] transition-all duration-200 outline-none shadow-sm placeholder-gray-400 cursor-pointer"
                                type="file"
                                accept="image/*"
                                name="file"
                                onChange={changeFileHandler}
                            />
                        </div>
                        {loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </Button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full h-10 rounded-lg my-5 bg-[#97d700] hover:bg-green-800"
                            >
                                Update
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;