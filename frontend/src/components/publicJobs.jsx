import { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "./utils/constant";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
// import { USER_API_END_POINT } from "../utils/constant";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate()

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${JOB_API_END_POINT}/get/public`);
                // 🔹 Public API endpoint for non-logged users
                setJobs(res.data.jobs);
                // console.log(res.data.jobs)
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);
    return (
        <div>
            <h1 className="text-2xl font-bold">Available Jobs</h1>
            {loading && <p>Loading jobs...</p>}
            <div className="grid gap-4 mt-4">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div key={job._id} className="p-4 border rounded-lg shadow-sm">
                            <h2 className="font-semibold text-lg">{job.title}</h2>
                            <p>{job.company.name}</p>
                            <p className="text-gray-600">{job.location}</p>
                            <Button variant="outline" onClick={() => navigate(`/job/descrption/${job?._id}`)} className='text-white'>Details</Button>
                        </div>
                    ))
                ) : (
                    <p>No jobs available</p>
                )}
            </div>
        </div>
    );
};

export default Jobs;
