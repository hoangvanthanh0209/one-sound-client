import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FaRegClock } from 'react-icons/fa'

import SongItem from '../SongItem/SongItem'

function ListSong() {
    const [scrollY, setScrollY] = useState(0)
    const background = useRef()
    const header = useRef()

    const logit = () => {
        setScrollY(window.pageYOffset)
    }

    const setBackground = () => {
        if (scrollY >= 400) {
            background.current.style.opacity = 1
            header.current.classList.remove('border-b', 'border-primary')
        } else {
            background.current.style.opacity = 0
            header.current.classList.add('border-b', 'border-primary')
        }
    }

    useLayoutEffect(() => {
        setBackground()
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', logit)
        setBackground()
        return () => {
            window.removeEventListener('scroll', logit)
        }
    }, [scrollY])

    return (
        <div className="w-full h-full">
            <div
                ref={background}
                className="fixed top-h-header right-0 flex w-w-header h-h-header-table bg-[#282828] opacity-0 pointer-events-none z-3"
            ></div>
            <div
                ref={header}
                className="flex justify-center items-center sticky top-h-header w-full h-h-header-table text-sm text-primary uppercase border-b border-primary z-3"
            >
                <div className="flex justify-center items-center w-1/12 h-full px-2">
                    <span>#</span>
                </div>
                <div className="flex justify-start items-center w-4/12 h-full px-2">
                    <span>Title</span>
                </div>
                <div className="flex justify-start items-center w-3/12 h-full px-2">
                    <span>Album</span>
                </div>
                <div className="flex justify-start items-center w-2/12 h-full px-2">
                    <span>Date Added</span>
                </div>
                <div className="flex justify-center items-center w-2/12 h-full px-2">
                    <div className="w-4 h-4">
                        <FaRegClock className="w-full h-full" />
                    </div>
                </div>
            </div>
            <div className="w-full h-full">
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
            </div>
        </div>
    )
}

export default ListSong
