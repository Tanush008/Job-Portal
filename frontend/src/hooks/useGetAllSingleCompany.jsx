import { COMPANY_END_POINT } from '@/components/utils/constant'
import { setSingleCompany } from '@/redux/companySlice'
// import { setJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllSingleCompany = (companyId) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_END_POINT}/get/${companyId}`, {
                    withCredentials: true
                })
                console.log(res.data);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllCompany()
    }, [companyId, dispatch])
}

export default useGetAllSingleCompany