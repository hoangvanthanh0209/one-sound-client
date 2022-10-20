import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import MyError from '~/utils/error'
import { ActionButton, ArtistHeader, Background, DashBoard, PopularSong } from '~/components'
import { randomColor } from '~/redux/config/configSlice'
import { currentSelector } from '~/redux/selector'
import songService from '~/redux/song/songService'
import artistService from '~/redux/artist/artistService'
import playlistService from '~/redux/playlist/playlistService'

function Artist() {
    const dispatch = useDispatch()
    const { userId } = useSelector(currentSelector)

    const [artist, setArtist] = useState({})
    const [playlists, setPlaylists] = useState([])
    const [songs, setSongs] = useState([])
    const [error, setError] = useState('')

    const getArtistById = async (userId) => {
        try {
            const respon = await artistService.getArtistById(userId)
            setArtist(respon)
        } catch (error) {
            console.log(error)
            const message = MyError.getError(error)
            setError(message)
        }
    }

    const getPlaylistsByUserId = async (userId) => {
        try {
            const respon = await playlistService.getPlaylistsByUserId(userId)
            setPlaylists(respon)
        } catch (error) {
            console.log(error)
            const message = MyError.getError(error)
            setError(message)
        }
    }

    const getPopulaSongsByUserId = async (userId) => {
        try {
            const respon = await songService.getPopulaSongsByUserId(userId)
            setSongs(respon)
        } catch (error) {
            console.log(error)
            const message = MyError.getError(error)
            setError(message)
        }
    }

    useEffect(() => {
        dispatch(randomColor())
        getArtistById(userId)
        getPopulaSongsByUserId(userId)
        getPlaylistsByUserId(userId)
    }, [])

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-[#181818] -z-3"></div>
            <div className="px-8 pb-6">
                <ArtistHeader data={artist} />
                <div className="flex flex-col">
                    <ActionButton type="artist" id={artist?.id} />
                    <div className="flex flex-col gap-10">
                        <PopularSong data={songs} isRedirectPlaylist={true} />
                        <DashBoard title="Playlist" data={playlists} isShowMore={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Artist
