import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Background, ProfileHeader, SongTable } from '~/components'
import { randomColor } from '~/redux/config/configSlice'
import { getSongOfPlaylist, resetMe } from '~/redux/me/meSlice'
import { currentSelector, meSelector } from '~/redux/selector'

function MySong() {
    const dispatch = useDispatch()
    const { playlistIdMe } = useSelector(currentSelector)
    const { currentPlaylist, songs, isSuccessMe } = useSelector(meSelector)

    useEffect(() => {
        dispatch(randomColor())
        dispatch(getSongOfPlaylist(playlistIdMe))
    }, [])

    useEffect(() => {
        isSuccessMe && dispatch(resetMe())
    }, [currentPlaylist, songs])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-[#181818] -z-3"></div>
            <div className="px-8 pb-6">
                <ProfileHeader />
                <div className="mt-8">
                    <SongTable
                        data={songs}
                        playlistName={
                            Object.keys(currentPlaylist).length === 0 && currentPlaylist.constructor === Object
                                ? 'Loading'
                                : currentPlaylist.name
                        }
                        isContextMenu={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default MySong
