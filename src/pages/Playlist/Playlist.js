import { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ActionButton, Background, ListSong, PlaylistHeader } from '~/components'
import { randomColor } from '~/redux/config/configSlice'
import { getPlaylistById, resetPlaylist } from '~/redux/playlist/playlistSlice'
import { getSongsByPlaylistId, resetSong } from '~/redux/song/songSlice'
import { currentSelector, playlistSelector, songSelector } from '~/redux/selector'

function Playlist() {
    const dispatch = useDispatch()
    const { currentPlaylist, isSuccessPlaylist } = useSelector(playlistSelector)
    const { songs, isSuccessSong } = useSelector(songSelector)
    const { playlistId } = useSelector(currentSelector)

    useEffect(() => {
        dispatch(randomColor())
        dispatch(getPlaylistById(playlistId))
        dispatch(getSongsByPlaylistId(playlistId))
    }, [])

    useEffect(() => {
        isSuccessPlaylist && dispatch(resetPlaylist())
    }, [currentPlaylist])

    useEffect(() => {
        isSuccessSong && dispatch(resetSong())
    }, [songs])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-[#181818] -z-3"></div>
            <div className="px-8 pb-6">
                <PlaylistHeader data={currentPlaylist} />
                <div>
                    <ActionButton />
                    <ListSong data={songs} />
                </div>
            </div>
        </div>
    )
}

export default Playlist
