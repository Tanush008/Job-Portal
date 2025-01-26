import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
// import './Navbar.css'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
// import { Popover } from '@radix-ui/react-popover'
const Navbar = () => {
    // const user = false;
    const user = useSelector(store => store.auth)
    return (
        <>
            <main>
                <div className='heading navbar h-[100px] flex items-center justify-between bg-black text-white px-[10px]'>
                    <h1 className='text-xl'>Job<span className='text-blue-600 '>Portal</span></h1>
                    <ul className='flex gap-20 text-[22px] font-semibold'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/jobs'}>Jobs</Link >
                        <Link to={'/browse'}>Browse</Link>
                    </ul>
                    {
                        !user ? (
                            <div className="log flex gap-10 items-center">
                                <Link to="/login"><Button >Login</Button></Link>
                                <Link to="/signUp"><Button>Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Avatar className='px-2'>
                                        <img className='size-9 rounded-md' src="https://github.com/shadcn.png" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div class="box">
                                        <div className="side-content">
                                            <Avatar class="mini-img">
                                                <img className='size-10 rounded-md' src="https://github.com/shadcn.png" />
                                            </Avatar>
                                            <div className="text-content">
                                                <h4>Tanush Agg</h4>
                                                <p>Lorem, ipsum dolor.</p>
                                            </div>
                                        </div>
                                        <div>
                                            <Button className='flex mb-2 mt-2'>View Profile</Button>
                                            <Button className='flex'>Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </main >
        </>
    )
}

export default Navbar