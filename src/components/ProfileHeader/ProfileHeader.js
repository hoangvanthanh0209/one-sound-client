// import { useRef } from 'react'
import { FaCheck, FaEllipsisH } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'

import images from '~/assets/images'
// import { showModal } from '~/redux/config/configSlice'
// import config from '~/config'
import { authSelector } from '~/redux/selector'
// import { logout } from '~/redux/auth/authSlice'

function ProfileHeader() {
    // const menuProfileHeader = useRef()
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    const { user } = useSelector(authSelector)

    // const handleShowMenu = () => {
    //     menuProfileHeader.current.classList.remove('hidden')
    // }

    // const handleHiddenMenu = () => {
    //     menuProfileHeader.current.classList.add('hidden')
    // }

    // const handleShowModal = (type) => {
    //     switch (type) {
    //         case 'showInfo':
    //             dispatch(showModal({ title: 'Thông tin cá nhân', form: 'InfoForm' }))
    //             break
    //         case 'changePassword':
    //             dispatch(showModal({ title: 'Thay đổi mật khẩu', form: 'AuthenForm' }))
    //             break
    //         default:
    //             break
    //     }
    // }

    // const handleLogout = () => {
    //     dispatch(logout())
    //     navigate(config.routes.home)
    // }

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
            {/* <div className="absolute top-0 right-0">
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
                    <ul className="bg-[#383838] rounded-md w-44 overflow-hidden py-2">
                        <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                            <button
                                onClick={() => {
                                    handleShowModal('showInfo')
                                }}
                            >
                                Thông tin cá nhân
                            </button>
                        </li>
                        <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                            <Link to={'/'}>Quản lý playlist</Link>
                        </li>
                        <div className="h-px mx-3 bg-primary opacity-70"></div>
                        <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                            <button
                                onClick={() => {
                                    handleShowModal('changePassword')
                                }}
                            >
                                Thay đổi mật khẩu
                            </button>
                        </li>
                        <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                            <button onClick={handleLogout}>Đăng xuất</button>
                        </li>
                    </ul>
                </div>
            </div> */}
        </div>
    )
}

export default ProfileHeader
