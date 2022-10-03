import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Background, DashBoard, ProfileHeader } from '~/components'
import { randomColor } from '~/redux/config/configSlice'
import { authSelector } from '~/redux/selector'

function Profile() {
    const dispatch = useDispatch()
    const { user } = useSelector(authSelector)

    useLayoutEffect(() => {
        dispatch(randomColor())
    }, [])

    return (
        <div className="relative">
            <Background />
            <div className="absolute top-h-header-content left-0 w-full h-h-bg-body-content bg-[#181818] -z-3"></div>
            <div className="px-8 pb-6">
                <ProfileHeader user={user} />
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
