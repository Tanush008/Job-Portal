// import Navbar from '../Navbar/Navbar'
import HomeSection from '../HomeSection/HomeSection'
// import CategoryCarousel from '../CategoryCarousel/CategoryCarousel'
import LatesJobs from '../LatesJobs'
import Footer from '../Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import './Home.css';
import Jobs from '../publicJobs';
const Home = () => {
    useGetAllJobs()
    return (
        <div className="home">
            <HomeSection />
            <Jobs />
            <LatesJobs />
            <Footer />
        </div>
    )
}
export default Home