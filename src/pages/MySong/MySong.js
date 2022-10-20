import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import myError from '~/utils/error'
import { Background, Pagination, ProfileHeader, SongTable } from '~/components'
import { randomColor } from '~/redux/config/configSlice'
import { resetReloadSong } from '~/redux/current/currentSlice'
import { authSelector, currentSelector } from '~/redux/selector'
import meService from '~/redux/me/meService'

function MySong() {
    const dispatch = useDispatch()
    const { playlistIdMe, isReloadSong } = useSelector(currentSelector)
    const { user } = useSelector(authSelector)
    const { token } = user

    const [playlist, setPlaylist] = useState({})
    const [songs, setSongs] = useState([])
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 0,
        totalRows: 0,
    })
    const [filters, setFilters] = useState({
        playlistId: playlistIdMe,
        page: 1,
        limit: 5,
        name: '',
    })
    const [error, setError] = useState('')

    const HEIGHT_ITEM = 56
    const SPACING_HEADER = 56

    const getSongsByPlaylistId = async (filters, token) => {
        try {
            const respon = await meService.getSongsByPlaylistId(filters, token)
            const { playlist, songs, pagination } = respon
            setPlaylist(playlist)
            setSongs(songs)
            setPagination(pagination)
        } catch (error) {
            console.log(error)
            const message = myError.getError(error)
            setError(message)
        }
    }

    const handlePagechange = (newPage) => {
        setFilters((prevData) => {
            return { ...prevData, page: newPage }
        })
    }

    useEffect(() => {
        dispatch(randomColor())
    }, [])

    useEffect(() => {
        getSongsByPlaylistId(filters, token)
    }, [filters])

    useEffect(() => {
        isReloadSong && getSongsByPlaylistId(filters, token)
        dispatch(resetReloadSong())
    }, [isReloadSong])

    useEffect(() => {
        songs.length === 0 &&
            pagination.page > 1 &&
            setFilters((prevData) => {
                return { ...prevData, page: pagination.page - 1 }
            })
    }, [songs])

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-[#181818] -z-3"></div>
            <div className="px-8 pb-6">
                <ProfileHeader />
                <div className="mt-8">
                    <div style={{ height: filters.limit * HEIGHT_ITEM + SPACING_HEADER + 'px' }}>
                        <SongTable data={songs} playlistName={playlist?.name} isContextMenu={true} />
                    </div>
                    <Pagination pagination={pagination} onPageChange={handlePagechange} />
                </div>
            </div>
        </div>
    )
}

export default MySong
