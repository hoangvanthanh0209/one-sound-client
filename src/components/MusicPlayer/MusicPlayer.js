import {
    FaRegHeart,
    FaBuffer,
    FaRedo,
    FaStepBackward,
    FaPlay,
    FaPause,
    FaStepForward,
    FaRandom,
    FaVolumeMute,
    FaVolumeUp,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

import avatar from '~/assets/images/avatar-default.jpg'
import SongItem from '../SongItem/SongItem'

function MusicPlayer() {
    const [show, setShow] = useState(false)
    const [timeSong, setTimeSong] = useState(0)
    const [volumn, setVolumn] = useState(100)

    const bgRef = useRef()
    const timeSongRef = useRef()
    const timeSongCurrentRef = useRef()
    const volumnRef = useRef()
    const volumnCurrentRef = useRef()

    const handleShow = () => {
        if (show) {
            setShow(false)
            bgRef.current.classList.add('translate-y-spacing-hidden-music-player-list-song')
        } else {
            setShow(true)
            bgRef.current.classList.remove('translate-y-spacing-hidden-music-player-list-song')
        }
    }

    const handleChangeTimeSong = (e) => {
        const currentTime = e.target.value
        setTimeSong(currentTime)
        timeSongCurrentRef.current.style.width = `${currentTime}%`
    }
    const handleChangeVolumn = (e) => {
        const currentVolumn = e.target.value
        setVolumn(currentVolumn)
        volumnCurrentRef.current.style.width = `${currentVolumn}%`
    }

    const handleVolumnBtnClick = () => {
        if (volumn > 0) {
            setVolumn(0)
            volumnCurrentRef.current.style.width = '0%'
        } else {
            setVolumn(100)
            volumnCurrentRef.current.style.width = '100%'
        }
    }

    const renderVolumnIcon = () => {
        return volumn > 0 ? (
            <div className="w-4 h-4">
                <FaVolumeUp className="w-full h-full" />
            </div>
        ) : (
            <div className="w-4 h-4">
                <FaVolumeMute className="w-full h-full" />
            </div>
        )
    }

    // useEffect(() => {
    // }, [timeSong, volumn])

    return (
        <div className="flex items-center relative bg-18 h-h-music-player px-4">
            <div
                ref={bgRef}
                className="list-song-custom absolute -top-t-music-player-list-song left-l-music-player-list-song w-w-music-player-list-song h-h-music-player-list-song bg-1C overflow-hidden translate-y-spacing-hidden-music-player-list-song z-50"
            >
                <div className="px-8 w-full h-full z-50">
                    <div>
                        <span className="text-primary font-medium">Now playing</span>
                        <SongItem />
                    </div>
                    <div className="mt-10 w-full h-full">
                        <span className="text-primary font-medium">
                            Next from:{' '}
                            <Link to={'/'} className="capitalize hover:text-white hover:underline">
                                V-POP Không thể thiếu
                            </Link>
                        </span>
                        <div className="w-full h-140 overflow-y-scroll">
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
                </div>
            </div>
            <div className="flex justify-between items-center w-full z-10">
                <div className="flex justify-start items-center w-1/4 overflow-hidden">
                    <div className="w-14 h-14">
                        <img src={avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col px-4 w-60">
                        <Link to="/" className="text-sm text-white truncate hover:underline">
                            Em day chang phat thuy kieu
                        </Link>
                        <Link to="/" className="text-xs text-primary hover:underline">
                            Hoang Thuy Linh
                        </Link>
                    </div>
                    <div className="flex justify-center items-center w-8 h-8 text-primary cursor-pointer hover:text-white">
                        <button className="w-4 h-4">
                            <FaRegHeart className="w-full h-full" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-2/4 mx-4">
                    <div className="flex justify-center items-center gap-2 text-primary cursor-pointer">
                        <div className="flex justify-center items-center w-8 h-8 hover:text-white">
                            <button className="w-4 h-4">
                                <FaRedo className="w-full h-full" />
                            </button>
                        </div>
                        <div className="flex justify-center items-center w-8 h-8 hover:text-white">
                            <button className="w-4 h-4">
                                <FaStepBackward className="w-full h-full" />
                            </button>
                        </div>
                        <div className="flex justify-center items-center w-8 h-8 hover:text-white">
                            <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full text-black">
                                <button className="w-3 h-3">
                                    <FaPlay className="w-full h-full" />
                                </button>
                                <button className="w-3 h-3 hidden">
                                    <FaPause className="w-full h-full" />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-8 h-8 hover:text-white">
                            <button className="w-4 h-4">
                                <FaStepForward className="w-full h-full" />
                            </button>
                        </div>
                        <div className="flex justify-center items-center w-8 h-8 hover:text-white">
                            <button className="w-4 h-4">
                                <FaRandom className="w-full h-full" />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2 text-primary">
                        <span className="text-xs">00:00</span>
                        <div className="flex justify-center items-center relative w-full slider">
                            <input
                                ref={timeSongRef}
                                type={'range'}
                                value={timeSong}
                                step="1"
                                min="0"
                                max="100"
                                className="progress"
                                onChange={handleChangeTimeSong}
                            />
                            <div
                                ref={timeSongCurrentRef}
                                className="absolute top-0 -left-0 bg-white w-0 h-full pointer-events-none time-current-song rounded"
                            ></div>
                        </div>
                        <span className="text-xs">04:21</span>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 w-1/4">
                    <div className="flex justify-center items-center w-8 h-8 text-primary cursor-pointer hover:text-white">
                        <button className="w-4 h-4" onClick={handleShow}>
                            <FaBuffer className="w-full h-full" />
                        </button>
                    </div>
                    <div className="flex justify-center items-center gap-2 text-primary">
                        <button
                            className="flex justify-center items-center w-8 h-8 text-primary cursor-pointer hover:text-white"
                            onClick={handleVolumnBtnClick}
                        >
                            {renderVolumnIcon()}
                        </button>
                        <div>
                            <div className="flex justify-center items-center relative w-full slider">
                                <input
                                    ref={volumnRef}
                                    type={'range'}
                                    value={volumn}
                                    step="1"
                                    min="0"
                                    max="100"
                                    className="progress"
                                    onChange={handleChangeVolumn}
                                />

                                <div
                                    ref={volumnCurrentRef}
                                    className="absolute top-0 -left-0 bg-white w-full h-full pointer-events-none volumn-current rounded"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer
