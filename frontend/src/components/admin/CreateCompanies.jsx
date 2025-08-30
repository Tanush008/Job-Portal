import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import axios from 'axios'
import { COMPANY_END_POINT } from '../utils/constant'
import { useNavigate } from 'react-router-dom'
// import { Toast } from '../ui/toast'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CreateCompanies = () => {
    const [companyName, setCompanyName] = useState("")
    console.log(companyName);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const regsiterCompany = async () => {
        if (!companyName.trim()) {
            alert("Please enter a valid company name.");
            return;
        }
        try {
            const res = await axios.post(`${COMPANY_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            })
            console.log(res.data);
            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company))
                // Toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "An error occurred while registering the company.");
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto text-white'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? You can change this later.</p>
                </div>
                <Label>Company Name</Label>
                <input
                    type="text"
                    className="my-2 w-full h-10 rounded-md  text-black px-3 focus:outline-none focus:ring-2 focus:ring-[#686a65] border border-gray-600"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-5 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <button type="button" className="bg-green-600 w-20 px-2 rounded-md py-2 h-10 hover:bg-green-900" onClick={regsiterCompany}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompanies