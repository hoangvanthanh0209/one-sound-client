import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ActionButton, Background, ListSong, PlaylistHeader } from '~/components'
import { randomColor } from '~/redux/slice/configSlice'

function Playlist() {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(randomColor())
    }, [])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-18 z-[-3]"></div>
            <div className="px-8">
                <PlaylistHeader />
                <div>
                    <ActionButton />
                    <ListSong />
                </div>
            </div>
        </div>
    )
}

export default Playlist
