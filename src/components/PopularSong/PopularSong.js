import { useEffect, useRef, useState } from 'react'
import { SongItem } from '~/components'

function PopularSong({ data }) {
    const [showMore, setShowMore] = useState(false)
    const popularSong = useRef()

    const handleShow = () => {
        setShowMore(!showMore)
    }

    useEffect(() => {
        if (showMore) {
            popularSong.current.classList.remove('h-70')
            popularSong.current.classList.add('h-140')
        } else {
            popularSong.current.classList.add('h-70')
            popularSong.current.classList.remove('h-140')
        }
    }, [showMore])

    return (
        <div className="w-full h-full">
            <span className="text-2xl text-white">Popular</span>
            <div ref={popularSong} className="popular-song w-full h-70 mt-5 overflow-hidden">
                {data.map((song, index) => {
                    return <SongItem key={song.id} data={song} index={index + 1} isContextMenu={false} />
                })}
            </div>
            <button className="text-primary text-xs uppercase tracking-wide" onClick={handleShow}>
                {showMore ? 'See less' : 'See more'}
            </button>
        </div>
    )
}

export default PopularSong
