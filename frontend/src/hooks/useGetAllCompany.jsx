import { COMPANY_END_POINT, JOB_API_END_POINT } from '@/components/utils/constant'
import { setCompany } from '@/redux/companySlice'
// import { setJobs } from '@/redux/jobSlice' 
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompany = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_END_POINT}/get`, {
                    withCredentials: true
                })
                // console.log(res.data);
                if (res.data.success) {
                    dispatch(setCompany(res.data.companies))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllCompany()
    }, [])
}

export default useGetAllCompany