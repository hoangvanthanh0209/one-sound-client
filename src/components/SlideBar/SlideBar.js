import { FaSpotify, FaHome, FaSearch, FaBook, FaPlus, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function SlideBar() {
    return (
        <div className="flex flex-col gap-6 p-5 bg-black h-full w-full">
            <Link to="/" className="flex justify-start items-center py-2">
                <div className="w-8 h-8 mr-2">
                    <FaSpotify className="fill-white w-full h-full" />
                </div>
                <span className="text-2xl text-white font-semibold">One sound</span>
            </Link>
            <ul>
                <li className="sidebar-item py-2">
                    <Link to="/" className="sidebar-link flex items-center text-primary hover:text-white">
                        <div className="w-6 h-6 mr-4">
                            <FaHome className=" w-full h-full" />
                        </div>
                        <span className="text-sm font-medium">Home</span>
                    </Link>
                </li>
                <li className="sidebar-item py-2">
                    <Link to="/playlist" className="sidebar-link flex items-center text-primary hover:text-white">
                        <div className="w-6 h-6 mr-4">
                            <FaSearch className=" w-full h-full" />
                        </div>
                        <span className="text-sm font-medium">Search</span>
                    </Link>
                </li>
                <li className="sidebar-item py-2">
                    <Link to="/artist" className="sidebar-link flex items-center text-primary hover:text-white">
                        <div className="w-6 h-6 mr-4">
                            <FaBook className=" w-full h-full" />
                        </div>
                        <span className="text-sm font-medium">Your Library</span>
                    </Link>
                </li>
                <li className="sidebar-item py-2">
                    <Link to="/me" className="sidebar-link flex items-center text-primary hover:text-white">
                        <div className="w-6 h-6 mr-4">
                            <FaBook className=" w-full h-full" />
                        </div>
                        <span className="text-sm font-medium">Me</span>
                    </Link>
                </li>
                <li className="sidebar-item pt-8 pb-2">
                    <Link to="/" className="sidebar-link flex items-center text-primary hover:text-white">
                        <div className="sidebar-link-icon flex justify-center items-center bg-primary rounded-sm w-6 h-6 mr-4">
                            <div className="w-3 h-3 text-icon-59">
                                <FaPlus className="w-full h-full" />
                            </div>
                        </div>
                        <span className="text-sm font-medium">Create Playlist</span>
                    </Link>
                </li>
                <li className="sidebar-item py-2">
                    <Link to="/" className="sidebar-link flex items-center text-primary hover:text-white">
                        <div className="sidebar-link-icon flex justify-center items-center bg-gradient-to-br from-violet-700 to-gray-400 opacity-70 rounded-sm w-6 h-6 mr-4">
                            <div className="w-3 h-3 text-icon-b2">
                                <FaHeart className="w-full h-full" />
                            </div>
                        </div>
                        <span className="text-sm font-medium">Liked Songs</span>
                    </Link>
                </li>
                <li>
                    <div className="h-px opacity-80 bg-primary mt-2"></div>
                </li>
            </ul>
        </div>
    )
}

export default SlideBar
