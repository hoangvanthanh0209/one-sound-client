import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Background, ProfileHeader, SongTable } from '~/components'
import { randomColor } from '~/redux/slice/configSlice'

function MySong() {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(randomColor())
    }, [dispatch])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-[#181818] -z-3"></div>
            <div className="px-8 pb-6">
                <ProfileHeader />
                <div className="mt-8">
                    <SongTable />
                </div>
            </div>
        </div>
    )
}

export default MySong
