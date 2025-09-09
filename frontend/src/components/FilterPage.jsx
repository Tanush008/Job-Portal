import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setsearchedByQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend", "backend", "FullStack Developer","Machine"]
    },
]

const FilterPage = () => {
    const [selected, setSelected] = useState('')
    const dispatch = useDispatch()
    const changeEventHandler = (value) => {
        setSelected(value)
    }
    useEffect(() => {
        dispatch(setsearchedByQuery(selected))
    }, [selected])
    return (
        <div className='w-full p-3 rounded-md mt-4 py-5'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {filterData.map((data, index) => (
                <div key={index} className='mb-4'>
                    <h1 className='font-bold text-lg mb-2'>{data.filterType}</h1>
                    {data.array.map((item, idx) => {
                        const ItemId = `id${index}-${idx}`
                        return (
                            <label
                                key={ItemId}
                                htmlFor={ItemId}
                                className="flex items-center space-x-3 cursor-pointer my-2"
                            >
                                <span className="relative">
                                    <input
                                        type="radio"
                                        id={ItemId}
                                        name={data.filterType}
                                        value={item}
                                        checked={selected === item}
                                        onChange={() => changeEventHandler(item)}
                                        className="peer appearance-none w-5 h-5 border-2 border-blue-400 rounded-full checked:border-blue-600 checked:bg-blue-100 transition-all duration-200"
                                    />
                                    <span className="pointer-events-none absolute left-0 top-0 w-5 h-5 flex items-center justify-center">
                                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 opacity-0 peer-checked:opacity-100 transition-all duration-200"></span>
                                    </span>
                                </span>
                                <span className="text-gray-700 hover:text-blue-600 transition">{item}</span>
                            </label>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default FilterPage