import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import Navbar from "../Navbar/Navbar";
import useGetAllSingleJob from "@/hooks/useGetAllSingleJob";
const PostJobs = () => {
    const params = useParams();
    useGetAllSingleJob(params.id);
    const [input, setInput] = useState({
        title: "",
        desc: "",
        requirements: "",
        salary: "",
        location: "",
        position: "",
        companyId: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);
    const { singleJob } = useSelector(store => store.jobs)
    // console.log(singleJob);
    // console.log(companies);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(
            (company) => company.name.toLowerCase() === value
        );
        setInput({ ...input, companyId: selectedCompany._id });
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (
            !input.title ||
            !input.desc ||
            !input.requirements ||
            !input.salary ||
            !input.location ||
            !input.position ||
            !input.companyId
        ) {
            alert("Please fill all fields and select a company.");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/admin/jobs");
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (singleJob) {
            setInput({
                title: singleJob.title || "",
                desc: singleJob.desc || "",
                location: singleJob.location || "",
                requirements: singleJob.requirements || "",
                salary: singleJob.salary || "",
            }); // Reset the file input
        }
    }, [singleJob]);
    return (
        <div>
            <Navbar />
            <main className="pt-20 px-6">

                <div className="flex items-center justify-center w-screen my-10">
                    <form
                        onSubmit={submitHandler}
                        className="p-8 max-w-4xl border border-gray-300 shadow-lg rounded-md bg-gradient-to-r from-gray-100 to-gray-200"
                    >
                        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            Post a New Job
                        </h1>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Title */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    placeholder="Enter job title"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Job Description
                                </label>
                                <textarea
                                    name="desc"
                                    value={input.desc}
                                    onChange={changeEventHandler}
                                    placeholder="Enter job description"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                />
                            </div>
                            {/* Requirements */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Requirements
                                </label>
                                <input
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    placeholder="Enter job requirements"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                />
                            </div>

                            {/* Salary */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Salary
                                </label>
                                <input
                                    type="number"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    placeholder="Enter salary"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="Enter location"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                />
                            </div>
                            {/* Number of Positions */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Number of Positions
                                </label>
                                <input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    placeholder="Enter number of positions"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                />
                            </div>

                            {/* Company Selection */}
                            <div className="col-span-2">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Select Company
                                </label>
                                {companies.length > 0 ? (
                                    <select
                                        onChange={(e) => selectChangeHandler(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                    >
                                        <option value="">Select a company</option>
                                        {companies.map((company) => (
                                            <option key={company._id} value={company.name.toLowerCase()}>
                                                {company.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-red-500 text-sm">
                                        Please register a company first.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            {loading ? (
                                <button
                                    type="button"
                                    className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
                                    disabled
                                >
                                    <span className="loader mr-2"></span> Posting Job...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all duration-300"
                                >
                                    Post Job
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </main>
        </div >
    );
};

export default PostJobs;
