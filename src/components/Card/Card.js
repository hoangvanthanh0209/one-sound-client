import { useEffect } from 'react'
import { FaSpotify, FaPlay } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import images from '~/assets/images'
import { resetArtist } from '~/redux/artist/artistSlice'
import { setPlaylistId, setUserId } from '~/redux/current/currentSlice'
import { playPlaylistById, resetMusic } from '~/redux/music/musicSlice'
import { artistSelector, musicSelector } from '~/redux/selector'

function Card({ type = 'playlist', data = {} }) {
    const dispatch = useDispatch()
    const { playlist, isSuccess } = useSelector(musicSelector)
    const { currentArtist, isSuccessArtist } = useSelector(artistSelector)

    const handlePlayPlaylistBtnClick = () => {
        dispatch(playPlaylistById(data.id))
    }

    const handleSetPlaylistId = (id) => {
        dispatch(setPlaylistId(id))
    }

    const handleSetUserId = (id) => {
        dispatch(setUserId(id))
    }

    useEffect(() => {
        isSuccess && dispatch(resetMusic())
    }, [playlist])

    useEffect(() => {
        isSuccessArtist && dispatch(resetArtist())
    }, [currentArtist])

    return (
        <div className="col-span-1 p-4 bg-[#282828] border-none rounded-md overflow-hidden cursor-pointer card hover:bg-[#383838]">
            <div className="relative">
                <div
                    className={`w-full h-full border-none ${
                        type === 'artist' ? 'rounded-full' : 'rounded-md'
                    } overflow-hidden`}
                >
                    <img
                        className="w-full h-36 object-cover"
                        src={data.thumbnail || (type === 'playlist' ? images.playlist : images.song)}
                        alt={type === 'playlist' ? data.name : data.artistName}
                    />
                </div>
                {type !== 'artist' && (
                    <div className="absolute top-2 left-2 w-4 h-4">
                        <FaSpotify className="fill-white w-full h-full" />
                    </div>
                )}
                {data.countSong > 0 && (
                    <div className="play absolute right-2 bottom-2 opacity-0 transition-opacity">
                        <button
                            className="flex justify-center items-center bg-play-btn w-10 h-10 rounded-full shadow-md shadow-gray-700"
                            onClick={handlePlayPlaylistBtnClick}
                        >
                            <div className="w-4 h-4">
                                <FaPlay className="fill-[#181818] w-full h-full" />
                            </div>
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-4">
                {type === 'playlist' ? (
                    <Link
                        to={`/playlist/${data.slug}`}
                        className="h-6 text-white font-medium truncate hover:underline"
                        onClick={() => {
                            handleSetPlaylistId(data.id)
                        }}
                    >
                        {data.name}
                    </Link>
                ) : (
                    <Link
                        to={`/artist/${data.slug}`}
                        className="h-6 text-white font-medium truncate hover:underline"
                        onClick={() => {
                            handleSetUserId(data.id)
                        }}
                    >
                        {data.artistName}
                    </Link>
                )}

                <div className="w-full h-10 overflow-hidden card-desc mt-1">
                    <h3 className="text-[#8a8a8a] text-sm w-full h-full">
                        {data.description === 'undefined' ? '' : data.description}
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Card
