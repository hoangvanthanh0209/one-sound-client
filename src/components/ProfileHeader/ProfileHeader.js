import { useRef } from 'react'
import { FaCheck, FaEllipsisH } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import avatar from '~/assets/images/avatar-default.jpg'

function ProfileHeader() {
    const menuProfileHeader = useRef()

    const handleShowMenu = () => {
        menuProfileHeader.current.classList.remove('hidden')
    }

    const handleHiddenMenu = () => {
        menuProfileHeader.current.classList.add('hidden')
    }

    return (
        <div className="flex justify-start items-center relative gap-10 h-h-header-content">
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
            <div className="absolute top-0 right-0">
                <div className="w-8 h-8 cursor-pointer">
                    <button
                        className="btn-menu-profile-header w-full h-full text-primary hover:text-white"
                        onMouseEnter={handleShowMenu}
                    >
                        <FaEllipsisH className="w-full h-full" />
                    </button>
                </div>
                <div
                    ref={menuProfileHeader}
                    className="menu-profile-header absolute top-10 right-0 text-primary hidden shadow-2xl"
                    onMouseLeave={handleHiddenMenu}
                >
                    <ul className="bg-38 rounded-md w-44 overflow-hidden">
                        <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                            <Link to={'/'}>Thông tin cá nhân</Link>
                        </li>
                        <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                            <Link to={'/'}>Quản lý playlist</Link>
                        </li>
                        <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                            <Link to={'/'}>Quản lý bài hát</Link>
                        </li>
                        <div className="h-px mx-3 bg-primary opacity-70"></div>
                        <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                            <Link to={'/'}>Thay đổi mật khẩu</Link>
                        </li>
                        <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                            <Link to={'/'}>Đăng xuất</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
