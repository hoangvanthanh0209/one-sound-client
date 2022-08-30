import { FaCheck } from 'react-icons/fa'
import avatar from '~/assets/images/avatar-default.jpg'

function ArtistHeader() {
    return (
        <div className="flex justify-start items-center gap-10 h-h-header-content">
            <div className="box">
                <div className="content">
                    <img className="avatar" src={avatar} alt="" />
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
                <span className="text-8xl text-white font-black">Phuong Ly</span>
                <span className="text-white font-medium mt-4">376,827 monthly listeners</span>
            </div>
        </div>
    )
}

export default ArtistHeader
