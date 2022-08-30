import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Background, DashBoard, ProfileHeader } from '~/components'
import { randomColor } from '~/redux/slice/configSlice'

function Profile() {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(randomColor())
    }, [])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-18 z-[-3]"></div>
            <div className="px-8">
                <ProfileHeader />
                <div className="mt-8">
                    <DashBoard />
                    <DashBoard />
                    <DashBoard />
                </div>
            </div>
        </div>
    )
}

export default Profile
