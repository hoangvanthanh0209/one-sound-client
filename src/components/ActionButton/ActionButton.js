import { useEffect, useState } from 'react'
import { FaPlay, FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import myError from '~/utils/error'
import { playPlaylistById, resetMusic } from '~/redux/music/musicSlice'
import { musicSelector } from '~/redux/selector'
import artistService from '~/redux/artist/artistService'
import playlistService from '~/redux/playlist/playlistService'

function ActionButton({ type = 'playlist', id }) {
    const dispatch = useDispatch()
    const { playlist, isSuccessMusic } = useSelector(musicSelector)
    const [error, setError] = useState('')

    const likePlaylist = async (id) => {
        try {
            const respon = await playlistService.likePlaylist(id)
        } catch (error) {
            console.log(error)
            const message = myError.getError(error)
            setError(message)
        }
    }

    const likeArtist = async (id) => {
        try {
            const respon = await artistService.likeArtist(id)
        } catch (error) {
            console.log(error)
            const message = myError.getError(error)
            setError(message)
        }
    }

    const handlePlayPlaylistBtnClick = () => {
        type == 'playlist' && id && dispatch(playPlaylistById(id))
    }

    const handleLikePlaylistBtnClick = () => {
        type == 'playlist' && id && likePlaylist(id)
        type == 'artist' && id && likeArtist(id)
    }

    useEffect(() => {
        isSuccessMusic && dispatch(resetMusic())
    }, [playlist])

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    return (
        <div className="flex justify-start items-center gap-8 h-h-action-playlist">
            {type === 'playlist' && (
                <button
                    className="flex justify-center items-center rounded-full cursor-pointer bg-play-btn w-14 h-14 hover:scale-110 transition-all"
                    onClick={handlePlayPlaylistBtnClick}
                >
                    <div className="w-5 h-5">
                        <FaPlay className="fill-black w-full h-full" />
                    </div>
                </button>
            )}
            <button className="w-8 h-8 cursor-pointer" onClick={handleLikePlaylistBtnClick}>
                <div className="w-full h-full text-primary hover:text-white">
                    <FaRegHeart className="w-full h-full" />
                </div>
            </button>
        </div>
    )
}

export default ActionButton
