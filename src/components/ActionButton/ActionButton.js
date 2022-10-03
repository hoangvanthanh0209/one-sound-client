import { useEffect } from 'react'
import { FaPlay, FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { likeArtist } from '~/redux/artist/artistSlice'
import { playPlaylistById, resetMusic } from '~/redux/music/musicSlice'
import { likePlaylist, resetPlaylist } from '~/redux/playlist/playlistSlice'
import { artistSelector, musicSelector, playlistSelector } from '~/redux/selector'

function ActionButton({ type = 'playlist' }) {
    const dispatch = useDispatch()
    const { currentPlaylist, isSuccessPlaylist } = useSelector(playlistSelector)
    const { playlist, isSuccessMusic } = useSelector(musicSelector)
    const { currentArtist } = useSelector(artistSelector)

    const handlePlayPlaylistBtnClick = () => {
        type = 'playlist' && dispatch(playPlaylistById(currentPlaylist.id))
    }

    const handleLikePlaylistBtnClick = () => {
        type = 'playlist' && dispatch(likePlaylist(currentPlaylist.id))
        type = 'artist' && dispatch(likeArtist(currentArtist.id))
    }

    useEffect(() => {
        isSuccessPlaylist && dispatch(resetPlaylist())
    }, [currentPlaylist])

    useEffect(() => {
        isSuccessMusic && dispatch(resetMusic())
    }, [playlist])

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
