import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import MyError from '~/utils/error'
import { ActionButton, Background, ListSong, PlaylistHeader } from '~/components'
import { randomColor } from '~/redux/config/configSlice'
import { currentSelector } from '~/redux/selector'
import playlistService from '~/redux/playlist/playlistService'
import songService from '~/redux/song/songService'

function Playlist() {
    const dispatch = useDispatch()
    const { playlistId } = useSelector(currentSelector)

    const [playlist, setPlaylist] = useState({})
    const [songs, setSongs] = useState([])
    const [error, setError] = useState('')

    const getPlaylistById = async (playlistId) => {
        try {
            const respon = await playlistService.getPlaylistById(playlistId)
            setPlaylist(respon)
        } catch (error) {
            console.log(error)
            const message = MyError.getError(error)
            setError(message)
        }
    }

    const getSongsByPlaylistId = async (playlistId) => {
        try {
            const respon = await songService.getSongsByPlaylistId(playlistId)
            setSongs(respon)
        } catch (error) {
            console.log(error)
            const message = MyError.getError(error)
            setError(message)
        }
    }

    useEffect(() => {
        dispatch(randomColor())
        getPlaylistById(playlistId)
        getSongsByPlaylistId(playlistId)
    }, [])

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-[#181818] -z-3"></div>
            <div className="px-8 pb-6">
                <PlaylistHeader data={playlist} />
                <div>
                    <ActionButton id={playlist?.id} />
                    <ListSong data={songs} />
                </div>
            </div>
        </div>
    )
}

export default Playlist
