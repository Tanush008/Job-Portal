// import { USER_API_END_POINT } from '@/components/utils/constant';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// const useFetchPublicJobs = () => {
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 setLoading(true);
//                 const res = await axios.get(`${USER_API_END_POINT}/get/public`);
//                 // 🔹 Public API endpoint for non-logged users
//                 setJobs(res.data.jobs);
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJobs();
//     }, []);
// }

// export default useFetchPublicJobs;