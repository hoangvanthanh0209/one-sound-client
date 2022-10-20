import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import myError from '~/utils/error'
import { Background, Pagination, PlaylistTable, ProfileHeader } from '~/components'
import { getCategories, resetCategory } from '~/redux/category/categorySlice'
import { randomColor } from '~/redux/config/configSlice'
import { resetReloadPlaylist } from '~/redux/current/currentSlice'
import { authSelector, categorySelector, currentSelector } from '~/redux/selector'
import meService from '~/redux/me/meService'

function MyPlaylist() {
    const dispatch = useDispatch()
    const { user } = useSelector(authSelector)
    const { token } = user
    const { isReloadPlaylist } = useSelector(currentSelector)
    const { isSuccessCategory } = useSelector(categorySelector)

    const [playlists, setPlaylists] = useState([])
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 0,
        totalRows: 0,
    })
    const [filters, setFilters] = useState({
        page: 1,
        limit: 5,
        name: '',
    })
    const [error, setError] = useState('')

    const HEIGHT_ITEM = 56
    const SPACING_HEADER = 56

    const getPlaylists = async (filters, token) => {
        try {
            const respon = await meService.getPlaylists(filters, token)
            const { data, pagination } = respon
            setPlaylists(data)
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
        dispatch(getCategories())
    }, [])

    useEffect(() => {
        getPlaylists(filters, token)
    }, [filters])

    useEffect(() => {
        isReloadPlaylist && getPlaylists(filters, token)
        dispatch(resetReloadPlaylist())
    }, [isReloadPlaylist])

    useEffect(() => {
        playlists.length === 0 &&
            pagination.page > 0 &&
            setFilters((prevData) => {
                return { ...prevData, page: pagination.page - 1 }
            })
    }, [playlists])

    useEffect(() => {
        isSuccessCategory && dispatch(resetCategory())
    }, [isSuccessCategory])

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
                        <PlaylistTable data={playlists} />
                    </div>
                    <Pagination pagination={pagination} onPageChange={handlePagechange} />
                </div>
            </div>
        </div>
    )
}

export default MyPlaylist
