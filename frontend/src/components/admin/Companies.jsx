
import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
// import CompaniesTable from './CompaniesTable'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import useGetAllCompany from '@/hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setsearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompany();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
        
    useEffect(() => {
        dispatch(setsearchCompanyByText(input));
    }, [input]);
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5 text-white'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                {/* <CompaniesTable/> */}
                {/* <h1>fdfa</h1> */}
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies
