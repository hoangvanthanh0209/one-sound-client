import { FaSpotify, FaHome, FaSearch, FaBook, FaPlus, FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import config from '~/config'
import { showModal } from '~/redux/config/configSlice'
import { authSelector } from '~/redux/selector'

function SlideBar() {
    const dispatch = useDispatch()
    const { user } = useSelector(authSelector)

    const handleAddPlaylistBtnClick = () => {
        dispatch(showModal({ title: 'Thông tin playlist', form: 'PlaylistForm' }))
    }

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
                    <Link
                        to={config.routes.search}
                        className="sidebar-link flex items-center text-primary hover:text-white"
                    >
                        <div className="w-6 h-6 mr-4">
                            <FaSearch className=" w-full h-full" />
                        </div>
                        <span className="text-sm font-medium">Search</span>
                    </Link>
                </li>
                <li className="sidebar-item py-2">
                    <Link to="/" className="sidebar-link flex items-center text-primary hover:text-white">
                        <div className="w-6 h-6 mr-4">
                            <FaBook className=" w-full h-full" />
                        </div>
                        <span className="text-sm font-medium">Your Library</span>
                    </Link>
                </li>
                {user && (
                    <>
                        {/* <li className="sidebar-item py-2">
                            <Link to="/me" className="sidebar-link flex items-center text-primary hover:text-white">
                                <div className="w-6 h-6 mr-4">
                                    <FaBook className=" w-full h-full" />
                                </div>
                                <span className="text-sm font-medium">Me</span>
                            </Link>
                        </li> */}
                        <li className="sidebar-item py-2">
                            <Link
                                to={config.routes.myplaylist}
                                className="sidebar-link flex items-center text-primary hover:text-white"
                            >
                                <div className="w-6 h-6 mr-4">
                                    <FaBook className=" w-full h-full" />
                                </div>
                                <span className="text-sm font-medium">My playlist</span>
                            </Link>
                        </li>
                        <li className="sidebar-item pt-8 pb-2">
                            <button
                                className="sidebar-link flex items-center text-primary hover:text-white"
                                onClick={handleAddPlaylistBtnClick}
                            >
                                <div className="sidebar-link-icon flex justify-center items-center bg-primary rounded-sm w-6 h-6 mr-4">
                                    <div className="w-3 h-3 text-[#595959]">
                                        <FaPlus className="w-full h-full" />
                                    </div>
                                </div>
                                <span className="text-sm font-medium">Create Playlist</span>
                            </button>
                        </li>
                        <li className="sidebar-item py-2">
                            <Link to="/" className="sidebar-link flex items-center text-primary hover:text-white">
                                <div className="sidebar-link-icon flex justify-center items-center bg-gradient-to-br from-violet-700 to-gray-400 opacity-70 rounded-sm w-6 h-6 mr-4">
                                    <div className="w-3 h-3 text-[#b2b2b2]">
                                        <FaHeart className="w-full h-full" />
                                    </div>
                                </div>
                                <span className="text-sm font-medium">Liked Songs</span>
                            </Link>
                        </li>
                    </>
                )}
                <li>
                    <div className="h-px opacity-80 bg-line mt-2"></div>
                </li>
            </ul>
        </div>
    )
}

export default SlideBar
