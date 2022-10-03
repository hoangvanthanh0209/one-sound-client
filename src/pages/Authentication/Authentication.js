import { useLayoutEffect, useRef } from 'react'
import images from '~/assets/images'
import { Login, Register } from '~/components'

function Authentication() {
    const background = useRef()

    const handleShowRegister = () => {
        background.current.classList.add('translate-x-[500px]')
    }
    const handleShowLogin = () => {
        background.current.classList.remove('translate-x-[500px]')
    }

    useLayoutEffect(() => {
        const pathName = window.location.pathname.replace('/', '')

        if (pathName === 'login') {
            background.current.classList.remove('translate-x-[500px]')
        } else {
            background.current.classList.add('translate-x-[500px]')
        }
    }, [])

    return (
        <div className="bg-rgba-0-05 rounded-md overflow-hidden">
            <div className="flex w-[1000px] h-[750px] relative">
                <div ref={background} className="absolute top-0 w-[500px] h-[750px] transition-all duration-1000 z-10">
                    <img src={images.music2} alt="" className="w-full h-full object-cover" />
                </div>
                <Register onClick={handleShowLogin} />
                <Login onClick={handleShowRegister} />
            </div>
        </div>
    )
}

export default Authentication
