import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { HeaderPlay } from '~/components'
import images from '~/assets/images'
import { authSelector, configSelector } from '~/redux/selector'
import config from '~/config'
import { showModal } from '~/redux/config/configSlice'
import { logout } from '~/redux/auth/authSlice'

function Header() {
    const [scrollY, setScrollY] = useState(0)
    const background = useRef()
    const menuHeader = useRef()
    const { user } = useSelector(authSelector)
    const { color } = useSelector(configSelector)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logit = () => {
        setScrollY(window.pageYOffset)
    }

    const handleShowMenu = () => {
        menuHeader.current.classList.remove('hidden')
    }

    const handleHiddenMenu = () => {
        menuHeader.current.classList.add('hidden')
    }

    const handleShowModal = (type) => {
        switch (type) {
            case 'showInfo':
                dispatch(showModal({ title: 'Thông tin cá nhân', form: 'InfoForm' }))
                break
            case 'changePassword':
                dispatch(showModal({ title: 'Thay đổi mật khẩu', form: 'AuthenForm' }))
                break
            default:
                break
        }
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate(config.routes.home)
    }

    useLayoutEffect(() => {
        background.current.style.background = color
    }, [color])

    useEffect(() => {
        let opacity = 0

        window.addEventListener('scroll', logit)

        opacity = scrollY < 300 ? (scrollY / 300).toFixed(2) : 1

        background.current.style.opacity = opacity

        return () => {
            window.removeEventListener('scroll', logit)
        }
    }, [scrollY])

    return (
        <div className="flex justify-end items-center relative h-full px-16 py-4 bg-transparent">
            <div
                ref={background}
                className="absolute top-0 right-0 flex w-full h-full opacity-1 pointer-events-none -z-2"
            ></div>
            {user ? (
                <div className="flex justify-center items-center gap-8">
                    {/* <button className="flex justify-center items-center border border-primary rounded-3xl h-8 px-4 py-2 text-primary hover:border-white hover:bg-black hover:text-white">
                        <span className="text-sm font-medium hover:font-semibold">Upgrade</span>
                    </button> */}
                    <div className="flex items-center relative gap-2 border-none cursor-pointer bg-[#0A0A0A] rounded-2xl h-8 pl-1 pr-4 text-white hover:bg-[#282828]">
                        <div
                            className="btn-menu-header w-7 h-7 rounded-full overflow-hidden"
                            onMouseEnter={handleShowMenu}
                        >
                            <img className="w-full h-full object-cover" src={user.avatar || images.avatar} alt="" />
                        </div>
                        <span className="text-sm tracking-wide">{user.artistName}</span>
                        <div
                            ref={menuHeader}
                            className="menu-header absolute top-11 right-0 text-primary hidden shadow-2xl z-20"
                            onMouseLeave={handleHiddenMenu}
                        >
                            <ul className="bg-[#383838] rounded-md w-44 overflow-hidden py-2 text-left">
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
                                    <Link to={config.routes.myplaylist}>Quản lý playlist</Link>
                                </li>
                                {/* <li className="px-4 py-1 cursor-pointer hover:bg-58 hover:text-white">
                                    <Link to={'/'}>Quản lý bài hát</Link>
                                </li>
                                <div className="h-px mx-3 bg-primary opacity-70"></div> */}
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
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center gap-8">
                    <Link to={config.routes.register} className="text-primary hover:text-white">
                        <span className="font-medium hover:font-semibold">Sign up</span>
                    </Link>
                    <Link
                        to={config.routes.login}
                        className="border-none bg-white rounded-3xl px-8 py-2 hover:opacity-90"
                    >
                        <span className="font-medium">Log in</span>
                    </Link>
                </div>
            )}
            {/* {scrollY >= 400 && <HeaderPlay />} */}
        </div>
    )
}

export default Header
