import { useLayoutEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { colorSelector } from '~/redux/selector'

function Background() {
    const bgPlaylist = useRef()
    const bgMidPlaylist = useRef()
    const color = useSelector(colorSelector)

    useLayoutEffect(() => {
        bgPlaylist.current.style.background = color
        bgMidPlaylist.current.style.background = color
    }, [color])

    return (
        <>
            <div ref={bgPlaylist} className="absolute -top-h-header left-0 w-full h-h-bg-header-content z-[-3]"></div>
            <div className="absolute -top-h-header left-0 w-full h-h-bg-header-content bg-header-content z-[-3]"></div>
            <div ref={bgMidPlaylist} className="absolute top-h-bg-middle-content left-0 w-full h-60 z-[-2]"></div>
            <div className="absolute top-h-bg-middle-content left-0 w-full h-60 bg-middle-content z-[-2]"></div>
        </>
    )
}

export default Background
