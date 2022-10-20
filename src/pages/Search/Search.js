import { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import myError from '~/utils/error'
import { DashBoard } from '~/components'
import { resetColor } from '~/redux/config/configSlice'
import artistService from '~/redux/artist/artistService'
import playlistService from '~/redux/playlist/playlistService'

function Search() {
    const dispatch = useDispatch()
    const [searchValue, setsearchValue] = useState('')
    const [type, setType] = useState('all')
    const [playlists, setPlaylists] = useState([])
    const [artists, setArtists] = useState([])
    const [error, setError] = useState('')
    const [filters, setFiters] = useState({
        page: 1,
        limit: 16,
        name: '',
    })

    const inputRef = useRef()
    const btnSearchRef = useRef()

    const handleInputChange = (e) => {
        const value = e.target.value
        setsearchValue(value)
    }

    const handleRadioChange = (e) => {
        const value = e.target.value
        setType(value)
    }

    const handleSearchBtnClick = () => {
        setFiters((prevData) => {
            return { ...prevData, name: searchValue }
        })
    }

    const handleEnterKeyUp = (e) => {
        if (e.key === 'Enter') {
            btnSearchRef.current.click()
        }
    }

    const getPlaylists = async (filters) => {
        try {
            const respon = await playlistService.getPlaylistsForPage(filters)
            setPlaylists(respon)
        } catch (error) {
            console.log(error)
            const message = myError.getError(error)
            setError(message)
        }
    }

    const getArtists = async (filters) => {
        try {
            const respon = await artistService.getArtists(filters)
            const { data } = respon
            setArtists(data)
        } catch (error) {
            console.log(error)
            const message = myError.getError(error)
            setError(message)
        }
    }

    useEffect(() => {
        dispatch(resetColor())
    }, [])

    useEffect(() => {
        getPlaylists(filters)
        getArtists(filters)
    }, [filters])

    useEffect(() => {
        const input = inputRef.current

        input.addEventListener('keyup', handleEnterKeyUp)

        return () => {
            input.removeEventListener('keyup', handleEnterKeyUp)
        }
    }, [inputRef])

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    return (
        <>
            <div className="flex justify-start items-center gap-10 mb-8">
                <div className="flex justify-start items-center bg-rgba-0-03 outline-none rounded-3xl w-[500px] text-base text-primary overflow-hidden">
                    <input
                        ref={inputRef}
                        value={searchValue}
                        className="flex-1 bg-transparent outline-none px-4 py-3"
                        spellCheck={false}
                        onChange={handleInputChange}
                    />
                    <button
                        ref={btnSearchRef}
                        className="flex justify-center items-center w-12 h-12 ml-2 border-l border-line"
                        onClick={handleSearchBtnClick}
                    >
                        <div className="w-4 h-4">
                            <FaSearch className="w-full h-full" />
                        </div>
                    </button>
                </div>
                <div className="flex text-primary">
                    <div className="flex items-center mr-4">
                        <input
                            checked={type === 'artist'}
                            id="artist"
                            type="radio"
                            value="artist"
                            name="typeSearch"
                            className="w-4 h-4"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="artist" className="ml-2">
                            Nghệ sĩ
                        </label>
                    </div>
                    <div className="flex items-center mr-4">
                        <input
                            checked={type === 'playlist'}
                            id="playlist"
                            type="radio"
                            value="playlist"
                            name="typeSearch"
                            className="w-4 h-4"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="playlist" className="ml-2">
                            Playlist
                        </label>
                    </div>
                    <div className="flex items-center mr-4">
                        <input
                            checked={type === 'all'}
                            id="all"
                            type="radio"
                            value="all"
                            name="typeSearch"
                            className="w-4 h-4"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="all" className="ml-2">
                            Tất cả
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 w-full">
                {artists.length > 0 && type !== 'playlist' && (
                    <DashBoard title="Nghệ sĩ nổi bật" data={artists} type="artist" isShowMore={false} isLimit={true} />
                )}
                {playlists.length > 0 && type !== 'artist' && (
                    <DashBoard title="Playlist nổi bật" data={playlists} isShowMore={false} isLimit={true} />
                )}
            </div>
        </>
    )
}

export default Search
