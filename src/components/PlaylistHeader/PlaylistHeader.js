import { FaMusic } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import images from '~/assets/images'
import { setUserId } from '~/redux/current/currentSlice'

function PlaylistHeader({ data }) {
    const { thumbnail, name, description, userId, userSlug, artistName, likeCount, countSong } = data
    const dispatch = useDispatch()

    const handleArtistLinkBtnClick = () => {
        dispatch(setUserId(userId))
    }

    return (
        <div className="flex justify-start items-center h-h-header-content">
            <div className="relative w-60 h-60 mr-5">
                <img className="w-full h-full object-cover" src={thumbnail || images.avatar} alt="" />

                <div className="absolute top-2 left-2">
                    <div className="w-6 h-6">
                        <FaMusic className="fill-white w-full h-full" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-6">
                <span className="text-sm text-white uppercase font-medium tracking-wider">PLAYLIST</span>
                <h1 className="text-8xl text-white font-bold py-2">{name}</h1>
                <div>
                    <h3 className="text-primary font-normal">{description}</h3>
                    <h3 className="flex gap-2 text-sm text-white mt-2">
                        <Link
                            to={`/artist/${userSlug}`}
                            className="font-semibold hover:underline"
                            onClick={handleArtistLinkBtnClick}
                        >
                            {artistName}
                        </Link>
                        <span className="playlist-like">{likeCount} likes</span>
                        <span className="playlist-song">{countSong} songs</span>
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default PlaylistHeader
