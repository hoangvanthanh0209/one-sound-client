import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Background, PlaylistTable, ProfileHeader } from '~/components'
import { randomColor } from '~/redux/slice/configSlice'

function MyPlaylist() {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(randomColor())
    }, [])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-[#181818] -z-3"></div>
            <div className="px-8 pb-6">
                <ProfileHeader />
                <div className="mt-8">
                    <PlaylistTable />
                </div>
            </div>
        </div>
    )
}

export default MyPlaylist
