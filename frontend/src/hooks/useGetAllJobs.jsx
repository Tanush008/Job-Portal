import { JOB_API_END_POINT } from '@/components/utils/constant'
import { setJobs } from '@/redux/jobSlice'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const { searchedByQuery } = useSelector(store => store.jobs)
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                // Convert query to lowercase for case-insensitive search
                const keyword = searchedByQuery ? searchedByQuery.toLowerCase() : ""
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${keyword}`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
                console.log(error.response?.data);
            }
        }
        fetchAllJobs()
    }, [searchedByQuery])
}

export default useGetAllJobs