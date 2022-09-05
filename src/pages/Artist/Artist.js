import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ActionButton, ArtistHeader, Background, DashBoard, PopularSong } from '~/components'
import { randomColor } from '~/redux/slice/configSlice'

function Playlist() {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(randomColor())
    }, [])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-[#181818] -z-3"></div>
            <div className="px-8 pb-6">
                <ArtistHeader />
                <div>
                    <ActionButton />
                    <PopularSong />
                    <DashBoard />
                    <DashBoard />
                    <DashBoard />
                </div>
            </div>
        </div>
    )
}

export default Playlist
