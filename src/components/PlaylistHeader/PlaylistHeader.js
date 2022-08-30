import { FaSpotify } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import avatar from '~/assets/images/avatar-default.jpg'

function PlaylistHeader() {
    return (
        <div className="flex justify-start items-center h-h-header-content">
            <div className="relative w-60 h-60 mr-5">
                <img className="object-cover w-full h-full" src={avatar} alt="" />

                <div className="absolute top-2 left-2">
                    <div className="w-6 h-6">
                        <FaSpotify className="fill-white w-full h-full" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-6">
                <span className="text-sm text-white uppercase font-medium tracking-wider">PLAYLIST</span>
                <h1 className="text-8xl text-white font-bold py-2">V-Pop Không Thể Thiếu</h1>
                <div>
                    <h3 className="text-primary font-normal">
                        V-Pop đã đơm hoa trên những khúc ca này. Ảnh bìa:{' '}
                        <Link to="/" className="hover:underline">
                            Phương Ly
                        </Link>
                    </h3>
                    <h3 className="flex gap-2 text-sm text-white mt-2">
                        <Link to="/" className="font-semibold hover:underline">
                            Spotify
                        </Link>
                        <span className="playlist-like">123,003 likes</span>
                        <span className="playlist-song">58 songs</span>
                        <span className="text-primary playlist-time">3 hr 43 min</span>
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default PlaylistHeader
