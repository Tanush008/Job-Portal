import React from 'react'
import { Carousel, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { CarouselItem } from '../ui/carousel'
import { CarouselContent } from '../ui/carousel'
import { Button } from '../ui/button'
const category = ['Software Engineer', 'Backend Developer', 'FrontEnd Developer',
  'Graphic Designer', 'Data Science']
const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto my-20 text-red-400'>

        <CarouselContent  >
          {
            category.map((catg, index) => (
              <CarouselItem className='md:basis-1/2 lg-basis-1/3'>
                <Button className='rounded-full' variant="outline">{catg}</Button>
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