import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar'
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
                    <input
                        className="w-fit border-2 rounded-md py-3 px-2 text-black border-gray-200 focus:border-[#97d700] focus:ring-2 focus:ring-[#97d70033] transition-all duration-200 outline-none shadow-sm placeholder-gray-400"
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
//     < input
// className = 'bg-gray-100 h-10 rounded-md px-4 border-2 border-gray-200 focus:border-[#97d700] focus:ring-2 focus:ring-[#97d70033] transition-all duration-200 outline-none shadow-sm placeholder-gray-400'