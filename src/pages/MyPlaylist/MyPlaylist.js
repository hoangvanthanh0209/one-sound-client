import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Background, PlaylistTable, ProfileHeader } from '~/components'
import { getCategories, resetCategory } from '~/redux/category/categorySlice'
import { randomColor } from '~/redux/config/configSlice'
import { getPlaylists, resetMe } from '~/redux/me/meSlice'
import { categorySelector, meSelector } from '~/redux/selector'

function MyPlaylist() {
    const dispatch = useDispatch()
    const { playlists, isSuccessMe } = useSelector(meSelector)
    const { categories, isSuccessCategory } = useSelector(categorySelector)

    useEffect(() => {
        dispatch(randomColor())
        dispatch(getPlaylists())
        dispatch(getCategories())
    }, [])

    useEffect(() => {
        isSuccessMe && dispatch(resetMe())
    }, [playlists])

    useEffect(() => {
        isSuccessCategory && dispatch(resetCategory())
    }, [categories])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-[#181818] -z-3"></div>
            <div className="px-8 pb-6">
                <ProfileHeader />
                <div className="mt-8">
                    <PlaylistTable data={playlists} />
                </div>
            </div>
        </div>
    )
}

export default MyPlaylist
