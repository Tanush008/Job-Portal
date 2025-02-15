import React, { useState } from 'react'
import './HomeSection.css';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setsearchedByQuery } from '@/redux/jobSlice';
const HomeSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const searchJobHandler = () => {
        dispatch(setsearchedByQuery(query))
        navigate("/browse")
    }
    return (
        <>
            <div class='Home_container'>
                <div class='Home_main'>
                    <h1 class='Home_heading'>No.1 Job hunt Website</h1>
                    <h3>Search,Apply&</h3>
                    <h2>Get Your <span>Dream Job</span></h2>
                    <p className='Home_para mt-[20px]'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <div class='Home_buttons'>
                        <input class='Home_search' input='text' placeholder='Enter the Job'
                            onChange={(e) => setQuery(e.target.value)} />
                        <Button onClick={searchJobHandler} class='Home_button text-white px-2 py-2 ml-[5px] size-10'><Search /></Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeSection