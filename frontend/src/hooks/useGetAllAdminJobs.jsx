import { JOB_API_END_POINT } from '@/components/utils/constant'
import { setAdminJob } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/adminjob`, {
                    withCredentials: true
                })
                // console.log(res.data);
                if (res.data.success) {
                    dispatch(setAdminJob(res.data.jobs))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllAdminJobs()
    }, [])
}

export default useGetAllAdminJobs 