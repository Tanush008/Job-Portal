import { JOB_API_END_POINT } from '@/components/utils/constant'
import { setJobs } from '@/redux/jobSlice'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const { searchedByQuery } = useSelector(store => store.jobs)
    console.log(searchedByQuery);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedByQuery}`, {
                    withCredentials: true
                })
                console.log(res.data);
                if (res.data.success) {
                    dispatch(setJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllJobs()
    }, [])
}

export default useGetAllJobs