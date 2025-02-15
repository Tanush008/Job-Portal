import React from 'react'
import { Carousel, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { CarouselItem } from '../ui/carousel'
import { CarouselContent } from '../ui/carousel'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setsearchedByQuery } from '@/redux/jobSlice'
const category = ['Software Engineer', 'Backend Developer', 'FrontEnd Developer',
  'Graphic Designer', 'Data Science']
const CategoryCarousel = () => {
  // const [query, setQuery] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const searchJobHandler = (query) => {
    dispatch(setsearchedByQuery(query))
    navigate("/browse")
  }
  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto my-20 text-red-400'>

        <CarouselContent  >
          {
            category.map((catg, index) => (
              <CarouselItem className='md:basis-1/2 lg-basis-1/3'>
                <Button onClick={() => searchJobHandler(catg)} className='rounded-full' variant="outline">{catg}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel