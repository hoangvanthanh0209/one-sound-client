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
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import images from '~/assets/images'
import { SongItem } from '~/components'
import { musicSelector } from '~/redux/selector'
import {
    nextSong,
    nextSongWithRandom,
    prevSong,
    prevSongWithRandom,
    setIsPlaying,
    setRandom,
    setRepeat,
} from '~/redux/music/musicSlice'
import { getArtistById } from '~/redux/artist/artistSlice'
import { likeSong } from '~/redux/song/songSlice'

function MusicPlayer() {
    const {
        playlist,
        songs,
        currentSong,
        indexSong,
        isPlaying,
        isRepeat: isRepeatSlice,
        isRandom: isRandomSlice,
    } = useSelector(musicSelector)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [duration, setDuration] = useState('')
    const [currentTimeSong, setCurrentTimeSong] = useState('00:00')
    const [timeSong, setTimeSong] = useState(0)
    const [volume, setVolume] = useState(100)
    const [isRepeat, setIsRepeat] = useState(isRepeatSlice)
    const [isRandom, setIsRandom] = useState(isRandomSlice)

    const { name, singer, thumbnail, mp3 } = currentSong

    const bgRef = useRef()
    const audioRef = useRef()
    const timeSongRef = useRef()
    const timeSongCurrentRef = useRef()
    const volumeRef = useRef()
    const volumeCurrentRef = useRef()
    const nextBtnRef = useRef()

    const handleShow = () => {
        if (Object.keys(playlist).length === 0 && playlist.constructor === Object) {
            toast.error('Hiện không có playlist nào đang được phát')
        } else {
            if (show) {
                setShow(false)
                bgRef.current.classList.add('translate-y-spacing-hidden-music-player-list-song')
            } else {
                setShow(true)
                bgRef.current.classList.remove('translate-y-spacing-hidden-music-player-list-song')
            }
        }
    }

    const handleChangeTimeSong = (e) => {
        const currentTime = e.target.value
        setTimeSong(currentTime)
        timeSongCurrentRef.current.style.width = `${currentTime}%`
    }
    const handleChangeVolume = (e) => {
        const currentVolume = e.target.value
        setVolume(currentVolume)
        volumeCurrentRef.current.style.width = `${currentVolume}%`
        audioRef.current.volume = currentVolume / 100
    }

    const handleVolumeBtnClick = () => {
        if (volume > 0) {
            setVolume(0)
            audioRef.current.volume = 0
            volumeCurrentRef.current.style.width = '0%'
        } else {
            setVolume(100)
            audioRef.current.volume = 1
            volumeCurrentRef.current.style.width = '100%'
        }
    }

    const renderVolumeIcon = () => {
        return volume > 0 ? (
            <div className="w-4 h-4">
                <FaVolumeUp className="w-full h-full" />
            </div>
        ) : (
            <div className="w-4 h-4">
                <FaVolumeMute className="w-full h-full" />
            </div>
        )
    }

    const handlePlayBtnClick = () => {
        dispatch(setIsPlaying(true))
        audioRef.current.play()
    }

    const handlePauseBtnClick = () => {
        // setPlaying(false)
        dispatch(setIsPlaying(false))
        audioRef.current.pause()
    }

    const handleNextBtnClick = () => {
        if (isRepeat) {
            audioRef.current.currentTime = 0
        } else if (isRandom) {
            dispatch(nextSongWithRandom())
        } else {
            dispatch(nextSong())
        }
    }

    const handlePrevBtnClick = () => {
        if (isRepeat) {
            audioRef.current.currentTime = 0
        } else if (isRandom) {
            dispatch(prevSongWithRandom())
        } else {
            dispatch(prevSong())
        }
    }

    const handleRepeatBtnClick = () => {
        setIsRepeat(!isRepeat)
        dispatch(setRepeat(!isRepeat))
    }
    const handleRandomBtnClick = () => {
        setIsRandom(!isRandom)
        dispatch(setRandom(!isRandom))
    }

    const handleArtistLinkBtnClick = () => {
        dispatch(getArtistById(playlist.userId))
    }

    const handleLikeSongBtnClick = () => {
        dispatch(likeSong(currentSong.id))
    }

    const formatTime = (secNumber) => {
        let hours = Math.floor(secNumber / 3600)
        let minutes = Math.floor((secNumber - hours * 3600) / 60)
        let seconds = Math.floor(secNumber - hours * 3600 - minutes * 60)

        hours = hours < 10 ? (hours > 0 ? '0' + hours : 0) : hours

        if (minutes < 10) {
            minutes = '0' + minutes
        }
        if (seconds < 10) {
            seconds = '0' + seconds
        }
        return (hours !== 0 ? hours + ':' : '') + minutes + ':' + seconds
    }

    useLayoutEffect(() => {
        setDuration('00:00')
    }, [])

    useEffect(() => {
        const audio = audioRef.current
        const progress = timeSongRef.current

        const updateProcess = () => {
            const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100)
            if (!isNaN(progressPercent)) {
                setTimeSong(progressPercent)
                setCurrentTimeSong(formatTime(audio.currentTime))
                timeSongCurrentRef.current.style.width = `${progressPercent}%`
            }
        }
        const seekSong = (e) => {
            const seekTime = (e.target.value * audio.duration) / 100
            audio.currentTime = seekTime
        }

        const endSong = () => {
            handleNextBtnClick()
        }

        if (audio && isPlaying) {
            const promise = audio.play()

            if (promise !== undefined) {
                promise
                    .then((_) => {
                        // Autoplay started!
                        //set duration
                        const durationSong = audio.duration
                        if (!isNaN(durationSong)) {
                            setDuration(formatTime(durationSong))
                        } else {
                            setDuration('00:00')
                        }
                        // load progres percent
                        audio.addEventListener('timeupdate', updateProcess)
                        //end song
                        audio.addEventListener('ended', endSong)
                        // seek song
                        progress.addEventListener('input', seekSong)
                    })
                    .catch((error) => {
                        console.log(error)
                        // Autoplay was prevented.
                        // Show a "Play" button so that user can start playback.
                    })
            }
        }

        // cleanup
        return () => {
            audio.removeEventListener('timeupdate', updateProcess)
            audio.removeEventListener('ended', endSong)
            progress.removeEventListener('input', seekSong)
        }
    }, [isPlaying, currentSong, audioRef, timeSongRef, indexSong])

    return (
        <div className="flex items-center relative bg-[#181818] h-full px-4">
            <audio ref={audioRef} id="audio" src={mp3}></audio>
            <div
                ref={bgRef}
                className="list-song-custom absolute -top-t-music-player-list-song left-l-music-player-list-song w-w-music-player-list-song h-h-music-player-list-song bg-[#1C1C1C] overflow-hidden translate-y-spacing-hidden-music-player-list-song"
            >
                <div className="px-8 w-full h-full">
                    {Object.keys(playlist).length > 0 && playlist.constructor === Object && (
                        <>
                            <div>
                                <span className="text-primary font-medium">Now playing</span>
                                <SongItem data={currentSong} isActive={true} />
                            </div>
                            <div className="mt-10 w-full h-full">
                                <span className="text-primary font-medium">
                                    Next from:{' '}
                                    <Link to={'/'} className="capitalize hover:text-white hover:underline">
                                        {playlist.name}
                                    </Link>
                                </span>
                                <div className="w-full h-140 overflow-y-scroll">
                                    {songs.map((song, index) => {
                                        return (
                                            index !== indexSong && (
                                                <SongItem key={song.id} data={song} index={index + 1} isPlay={true} />
                                            )
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-between items-center w-full">
                <div className="flex justify-start items-center w-1/4 overflow-hidden">
                    <div className="w-14 h-14">
                        <img src={thumbnail || images.song} alt="" className="w-full h-full object-cover" />
                    </div>
                    {Object.keys(currentSong).length === 0 && currentSong.constructor === Object ? (
                        <span className="text-sm text-primary truncate ml-4">Không có bài hát nào đang được phát</span>
                    ) : (
                        <>
                            <div className="flex flex-col px-4 w-60">
                                <span className="text-sm text-white truncate">{name}</span>
                                <Link
                                    to={`/artist/${playlist.userSlug}`}
                                    className="text-xs text-primary hover:underline"
                                    onClick={handleArtistLinkBtnClick}
                                >
                                    {singer}
                                </Link>
                            </div>
                            <button
                                className="flex justify-center items-center w-8 h-8 text-primary cursor-pointer hover:text-white"
                                onClick={handleLikeSongBtnClick}
                            >
                                <div className="w-4 h-4">
                                    <FaRegHeart className="w-full h-full" />
                                </div>
                            </button>
                        </>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-2/4 mx-4">
                    <div className="flex justify-center items-center gap-2 text-primary cursor-pointer">
                        <button
                            className={`flex justify-center items-center w-8 h-8 ${
                                isRepeat ? 'random-active' : 'hover:text-white'
                            }`}
                            onClick={handleRepeatBtnClick}
                        >
                            <div className="w-4 h-4">
                                <FaRedo className="w-full h-full" />
                            </div>
                        </button>
                        <button
                            className="flex justify-center items-center w-8 h-8 hover:text-white"
                            onClick={handlePrevBtnClick}
                        >
                            <div className="w-4 h-4">
                                <FaStepBackward className="w-full h-full" />
                            </div>
                        </button>
                        <div className="flex justify-center items-center w-8 h-8 hover:text-white">
                            {isPlaying ? (
                                <button
                                    className="flex justify-center items-center w-8 h-8 bg-white rounded-full text-black"
                                    onClick={handlePauseBtnClick}
                                >
                                    <div className="w-3 h-3">
                                        <FaPause className="w-full h-full" />
                                    </div>
                                </button>
                            ) : (
                                <button
                                    className="flex justify-center items-center w-8 h-8 bg-white rounded-full text-black"
                                    onClick={handlePlayBtnClick}
                                >
                                    <div className="w-3 h-3">
                                        <FaPlay className="w-full h-full" />
                                    </div>
                                </button>
                            )}
                        </div>
                        <button
                            ref={nextBtnRef}
                            className="flex justify-center items-center w-8 h-8 hover:text-white"
                            onClick={handleNextBtnClick}
                        >
                            <div className="w-4 h-4">
                                <FaStepForward className="w-full h-full" />
                            </div>
                        </button>
                        <button
                            className={`flex justify-center items-center w-8 h-8 ${
                                isRandom ? 'repeat-active' : 'hover:text-white'
                            }`}
                            onClick={handleRandomBtnClick}
                        >
                            <div className="w-4 h-4">
                                <FaRandom className="w-full h-full" />
                            </div>
                        </button>
                    </div>
                    <div className="flex justify-center items-center gap-2 text-primary">
                        <span className="text-xs">{currentTimeSong}</span>
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
                        <span className="text-xs">{duration}</span>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 w-1/4">
                    <button
                        className="flex justify-center items-center w-8 h-8 text-primary cursor-pointer hover:text-white"
                        onClick={handleShow}
                    >
                        <div className="w-4 h-4">
                            <FaBuffer className="w-full h-full" />
                        </div>
                    </button>
                    <div className="flex justify-center items-center gap-2 text-primary">
                        <button
                            className="flex justify-center items-center w-8 h-8 text-primary cursor-pointer hover:text-white"
                            onClick={handleVolumeBtnClick}
                        >
                            {renderVolumeIcon()}
                        </button>
                        <div>
                            <div className="flex justify-center items-center relative w-full slider">
                                <input
                                    ref={volumeRef}
                                    type={'range'}
                                    value={volume}
                                    step="1"
                                    min="0"
                                    max="100"
                                    className="progress"
                                    onChange={handleChangeVolume}
                                />

                                <div
                                    ref={volumeCurrentRef}
                                    className="absolute top-0 -left-0 bg-white w-full h-full pointer-events-none volume-current rounded"
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
