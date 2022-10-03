import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DashBoard } from '~/components'
import { artistSelector, playlistSelector } from '~/redux/selector'
import { resetColor } from '~/redux/config/configSlice'
import { getPlaylists, resetPlaylist } from '~/redux/playlist/playlistSlice'
import { getTopArtist, resetArtist } from '~/redux/artist/artistSlice'

function Home() {
    const dispatch = useDispatch()
    const { playlists, isSuccessPlaylist } = useSelector(playlistSelector)
    const { artists, isSuccessArtist } = useSelector(artistSelector)

    useEffect(() => {
        dispatch(resetColor())
        dispatch(getPlaylists())
        dispatch(getTopArtist())
    }, [])

    useEffect(() => {
        isSuccessPlaylist && dispatch(resetPlaylist())
    }, [playlists])

    useEffect(() => {
        isSuccessArtist && dispatch(resetArtist())
    }, [artists])

    return (
        <div className="flex flex-col gap-6 w-full">
            {playlists.map((playlist) => {
                return (
                    <DashBoard
                        key={playlist.categoryId}
                        title={playlist.categoryName}
                        data={playlist.data}
                        length={playlist.count}
                    />
                )
            })}
            <DashBoard title="Nghệ sĩ nổi bật" data={artists} length={artists.length} type="artist" />
        </div>
    )
}

export default Home
