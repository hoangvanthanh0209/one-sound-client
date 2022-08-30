import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaCaretDown } from 'react-icons/fa'

import HeaderPlay from '../HeaderPlay/HeaderPlay'
import avatar from '~/assets/images/avatar-default.jpg'
import { colorSelector } from '~/redux/selector'
import { Link } from 'react-router-dom'
import config from '~/config'

const user = false

function Header() {
    const [scrollY, setScrollY] = useState(0)
    const background = useRef()
    const color = useSelector(colorSelector)

    const logit = () => {
        setScrollY(window.pageYOffset)
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
        <div className="flex justify-end items-center relative h-full px-8 py-4 bg-transparent">
            <div
                ref={background}
                className="absolute top-0 right-0 flex w-full h-full opacity-1 pointer-events-none -z-[2]"
            ></div>
            {user ? (
                <div className="flex justify-center items-center gap-8">
                    <button className="flex justify-center items-center border border-primary rounded-3xl h-8 px-4 py-2 text-primary hover:border-white hover:bg-black hover:text-white">
                        <span className="text-sm font-medium hover:font-semibold">Upgrade</span>
                    </button>
                    <button className="flex items-center gap-2 border-none bg-0A rounded-2xl h-8 p-1 text-white hover:bg-28">
                        <div className="w-7 h-7 rounded-full overflow-hidden">
                            <img className="w-full h-full object-cover" src={avatar} alt="" />
                        </div>
                        <span className="text-sm tracking-wide">Hoangvanthanh</span>
                        <FaCaretDown />
                    </button>
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
            {scrollY >= 400 && <HeaderPlay />}
        </div>
    )
}

export default Header
