import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Bookmark } from 'lucide-react'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setsearchedByQuery } from '@/redux/jobSlice'
// import { RadioGroup } from '@mui/material'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]
const FilterPage = () => {
    const [selected, setSelectedValue] = useState('')
    const dispatch = useDispatch()
    const changeEventHandler = (value) => {
        setSelectedValue(value)
    }
    useEffect(() => {
        dispatch(setsearchedByQuery(selected))
    }, [selected])
    return (
        <div className='w-full bg-black p-3 rounded-md '>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup onValueChange={changeEventHandler} value={selected} className='space-y-4'>
                {
                    filterData.map((data, index) => (
                        <div key={index} className='mb-4'>
                            <h1 className='font-bold text-lg mb-2'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const ItemId = `id${index}-${idx}`
                                    return (
                                        <div key={ItemId} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem
                                                value={item}
                                                id={ItemId}
                                                className='cursor-pointer appearance-none border border-gray-300 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-100'
                                            />
                                            <Label htmlFor={ItemId} className='cursor-pointer text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out'>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterPage