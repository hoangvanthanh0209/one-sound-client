import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ActionButton, ArtistHeader, Background, DashBoard, PopularSong } from '~/components'
import { getArtistById, getPlaylistByArtistId, resetArtist } from '~/redux/artist/artistSlice'
import { randomColor } from '~/redux/config/configSlice'
import { getPlaylistsByUserId, resetPlaylist } from '~/redux/playlist/playlistSlice'
import { getPopulaSongsByUserId, resetSong } from '~/redux/song/songSlice'
import { artistSelector, currentSelector, playlistSelector, songSelector } from '~/redux/selector'

function Artist() {
    const dispatch = useDispatch()
    const { userId } = useSelector(currentSelector)
    const { currentArtist, isSuccessArtist } = useSelector(artistSelector)
    const { playlists, isSuccessPlaylist } = useSelector(playlistSelector)
    const { songs, isSuccessSong } = useSelector(songSelector)

    useEffect(() => {
        dispatch(randomColor())
        dispatch(getArtistById(userId))
        dispatch(getPlaylistsByUserId(userId))
        dispatch(getPopulaSongsByUserId(userId))
    }, [])

    useEffect(() => {
        isSuccessArtist && dispatch(resetArtist())
    }, [currentArtist])

    useEffect(() => {
        isSuccessPlaylist && dispatch(resetPlaylist())
    }, [playlists])

    useEffect(() => {
        isSuccessSong && dispatch(resetSong())
    }, [songs])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-[#181818] -z-3"></div>
            <div className="px-8 pb-6">
                <ArtistHeader data={currentArtist} />
                <div>
                    <ActionButton type="artist" />
                    <PopularSong data={songs} />
                    <DashBoard title="Playlist" type="playlist" data={playlists} length={playlists.length} />
                </div>
            </div>
        </div>
    )
}

export default Artist
