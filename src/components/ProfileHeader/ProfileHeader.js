import { useRef } from 'react'
import { FaCheck, FaEllipsisH } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import images from '~/assets/images'
import { showModal } from '~/redux/slice/configSlice'
import { InfoForm, AuthenForm } from '~/components'

function ProfileHeader() {
    const menuProfileHeader = useRef()
    const dispatch = useDispatch()

    const handleShowMenu = () => {
        menuProfileHeader.current.classList.remove('hidden')
    }

    const handleHiddenMenu = () => {
        menuProfileHeader.current.classList.add('hidden')
    }

    const handleShowModal = (type) => {
        switch (type) {
            case 'showInfo':
                // setForm((prevData) => {
                //     return {
                //         ...prevData,
                //         title: 'Thông tin cá nhân',
                //         Form: InfoForm,
                //     }
                // })

                dispatch(showModal({ title: 'Thông tin cá nhân', form: InfoForm }))
                break
            case 'changePassword':
                // setForm((prevData) => {
                //     return {
                //         ...prevData,
                //         title: 'Thay đổi mật khẩu',
                //         Form: AuthenForm,
                //     }
                // })
                dispatch(showModal({ title: 'Thay đổi mật khẩu', form: AuthenForm }))
                break
            default:
                break
        }
    }

    return (
        <div className="flex justify-start items-center relative gap-10 h-h-header-content">
            <div className="box">
                <div className="content">
                    <img className="avatar" src={images.avatar} alt="" />
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
                    <ul className="bg-[#383838] rounded-md w-44 overflow-hidden py-2">
                        <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                            {/* <Link to={'/'}>Thông tin cá nhân</Link> */}
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
                        <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                            <Link to={'/'}>Quản lý bài hát</Link>
                        </li>
                        <div className="h-px mx-3 bg-primary opacity-70"></div>
                        <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                            {/* <Link to={'/'}>Thay đổi mật khẩu</Link> */}
                            <button
                                onClick={() => {
                                    handleShowModal('changePassword')
                                }}
                            >
                                Thay đổi mật khẩu
                            </button>
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
