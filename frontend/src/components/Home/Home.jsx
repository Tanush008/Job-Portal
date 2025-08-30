// import Navbar from '../Navbar/Navbar'
import HomeSection from '../HomeSection/HomeSection'
// import CategoryCarousel from '../CategoryCarousel/CategoryCarousel'
import LatesJobs from '../LatesJobs'
import Footer from '../Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import './Home.css';
const Home = () => {
    useGetAllJobs()
    return (
        <div className="home">
            <HomeSection />
            <LatesJobs />
            <Footer />
        </div>
    )
}
export default Home