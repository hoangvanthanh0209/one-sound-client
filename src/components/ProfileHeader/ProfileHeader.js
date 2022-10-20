import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import images from '~/assets/images'
import { authSelector } from '~/redux/selector'

function ProfileHeader() {
    const { user } = useSelector(authSelector)

    return (
        <div className="flex justify-start items-center relative gap-10 h-h-header-content">
            <div className="box">
                <div className="content">
                    <img className="avatar" src={user.avatar || images.avatar} alt="" />
                </div>
            </div>
            <div className="flex flex-col justify-center gap-4 h-h-header-content">
                <div className="flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center w-6 h-6 bg-icon-verified border-none rounded-full">
                        <div className="w-4 h-4">
                            <FaCheck className="fill-white w-full h-full" />
                        </div>
                    </div>
                    <span className="text-sm text-white">Verified Artist</span>
                </div>
                <span className="text-8xl text-white font-black">{user.name}</span>
                <span className="text-white font-medium mt-4">{user.description}</span>
            </div>
        </div>
    )
}

export default ProfileHeader
