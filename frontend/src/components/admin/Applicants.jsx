import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { setapplicant } from '@/redux/applicants.slice';
import { APPLICANT_END_POINT } from '../utils/constant';
import axios from 'axios';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICANT_END_POINT}/${params.id}/applicant`, { withCredentials: true });
                // console.log(res.data);
                dispatch(setapplicant(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants {applicants?.application?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants