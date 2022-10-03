import { useEffect } from 'react'
import { FaSpotify } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import images from '~/assets/images'
import { getArtistById, resetArtist } from '~/redux/artist/artistSlice'
import { artistSelector, playlistSelector } from '~/redux/selector'

function PlaylistHeader({ data = {} }) {
    const dispatch = useDispatch()
    const { currentPlaylist } = useSelector(playlistSelector)
    const { currentArtist, isSuccessArtist } = useSelector(artistSelector)

    const handleArtistLinkBtnClick = () => {
        dispatch(getArtistById(currentPlaylist.userId))
    }

    useEffect(() => {
        isSuccessArtist && dispatch(resetArtist())
    }, [currentArtist])

    return (
        <div className="flex justify-start items-center h-h-header-content">
            <div className="relative w-60 h-60 mr-5">
                <img className="w-full h-full object-cover" src={data.thumbnail || images.avatar} alt="" />

                <div className="absolute top-2 left-2">
                    <div className="w-6 h-6">
                        <FaSpotify className="fill-white w-full h-full" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-6">
                <span className="text-sm text-white uppercase font-medium tracking-wider">PLAYLIST</span>
                <h1 className="text-8xl text-white font-bold py-2">{data.name}</h1>
                <div>
                    <h3 className="text-primary font-normal">{data.description}</h3>
                    <h3 className="flex gap-2 text-sm text-white mt-2">
                        <Link
                            to={`/artist/${currentPlaylist.userSlug}`}
                            className="font-semibold hover:underline"
                            onClick={handleArtistLinkBtnClick}
                        >
                            {data.artistName}
                        </Link>
                        <span className="playlist-like">{data.likeCount} likes</span>
                        <span className="playlist-song">{data.countSong} songs</span>
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default PlaylistHeader
