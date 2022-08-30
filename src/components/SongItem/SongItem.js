import { FaEllipsisH, FaPlay, FaRegHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import avatar from '~/assets/images/avatar-default.jpg'

function SongItem() {
    return (
        <div className="song-row flex justify-center items-center w-full h-14 text-sm text-primary cursor-pointer hover:bg-28">
            <div className="flex justify-center items-center relative w-1/12 h-full px-2">
                <span className="song-row-number absolute select-none pointer-events-none">1</span>
                <div
                    className="song-row-icon flex justify-center items-center absolute w-7 h-7 opacity-0"
                    onClick={() => {
                        alert('ok')
                    }}
                >
                    <div className="w-5 h-5">
                        <FaPlay className="fill-white w-full h-full" />
                    </div>
                </div>
            </div>
            <div className="flex justify-start items-center w-4/12 h-full px-2">
                <div className="w-10 h-10 mr-4">
                    <img src={avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <Link to="/" className="song-row-name text-base text-white hover:underline">
                        Chuyện Đôi Ta (feat. Muộii)
                    </Link>
                    <div>
                        <Link to="/" className="song-row-link hover:underline">
                            Emcee L (Da LAB),{' '}
                        </Link>
                        <Link to="/" className="song-row-link hover:underline">
                            Muộii
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex justify-start items-center w-3/12 h-full px-2">
                <Link to="/" className="song-row-link hover:underline">
                    Chuyện Đôi Ta (feat. Muộii)
                </Link>
            </div>
            <div className="flex justify-start items-center w-2/12 h-full px-2">
                <span>5 days ago</span>
            </div>
            <div className="flex justify-center items-center gap-6 w-2/12 h-full px-2">
                <div className="song-row-icon w-5 h-5 opacity-0 hover:text-white">
                    <FaRegHeart className="w-full h-full" />
                </div>
                <span>3:21</span>
                <div className="song-row-icon w-5 h-5 opacity-0 hover:text-white">
                    <FaEllipsisH className="w-full h-full" />
                </div>
            </div>
        </div>
    )
}

export default SongItem
