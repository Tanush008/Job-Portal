import React from 'react'
import Navbar from '../Navbar/Navbar'
import HomeSection from '../HomeSection/HomeSection'
import CategoryCarousel from '../CategoryCarousel/CategoryCarousel'
import LatesJobs from '../LatesJobs'
import Footer from '../Footer'
const Home = () => {
    return (
        <div className='bg-black text-white'>
            <Navbar />
            <HomeSection />
            <CategoryCarousel />
            <LatesJobs/>
            <Footer/>
        </div>
    )
}
export default Home