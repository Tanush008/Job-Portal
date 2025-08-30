// import { COMPANY_END_POINT } from '@/components/utils/constant'
import { JOB_API_END_POINT } from '@/components/utils/constant'
// import { setSingleCompany } from '@/redux/companySlice'
import { setSingleJob } from '@/redux/jobSlice'
// import { setJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllSingleJob = (jobId) => {
    // console.log(companyId+" from custom hook");
    // console.log(jobId+"jobId");
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true
                })
                console.log(res.data);
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch])
}

export default useGetAllSingleJob