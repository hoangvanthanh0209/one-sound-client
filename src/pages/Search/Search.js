import { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { DashBoard } from '~/components'
import { getArtistsByName, getTopArtistsFavourite, resetArtist } from '~/redux/artist/artistSlice'
import { getPlaylistsByName, getTopPlaylistsFavourite, resetPlaylist } from '~/redux/playlist/playlistSlice'
import { artistSelector, playlistSelector } from '~/redux/selector'

function Search() {
    const dispatch = useDispatch()
    const { playlists, isSuccessPlaylist } = useSelector(playlistSelector)
    const { artists, isSuccessArtist } = useSelector(artistSelector)

    const [searchValue, setsearchValue] = useState('')
    const [type, setType] = useState('all')

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
        const top = 16
        if (type === 'playlist') {
            if (searchValue) {
                dispatch(getPlaylistsByName(searchValue))
            } else {
                dispatch(getTopPlaylistsFavourite(top))
            }
        } else if (type === 'artist') {
            if (searchValue) {
                dispatch(getArtistsByName(searchValue))
            } else {
                dispatch(getTopArtistsFavourite(top))
            }
        } else {
            if (searchValue) {
                dispatch(getPlaylistsByName(searchValue))
                dispatch(getArtistsByName(searchValue))
            } else {
                dispatch(getTopPlaylistsFavourite(top))
                dispatch(getTopArtistsFavourite(top))
            }
        }
    }

    const handleEnterKeyUp = (e) => {
        if (e.key === 'Enter') {
            btnSearchRef.current.click()
        }
    }

    useEffect(() => {
        const top = 16
        dispatch(getTopPlaylistsFavourite(top))
        dispatch(getTopArtistsFavourite(top))
    }, [])

    useEffect(() => {
        const input = inputRef.current

        input.addEventListener('keyup', handleEnterKeyUp)

        return () => {
            input.removeEventListener('keyup', handleEnterKeyUp)
        }
    }, [inputRef])

    useEffect(() => {
        isSuccessPlaylist && dispatch(resetPlaylist())
    }, [playlists])

    useEffect(() => {
        isSuccessArtist && dispatch(resetArtist())
    }, [artists])

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
                {artists.length > 0 && (
                    <DashBoard title="Nghệ sĩ nổi bật" data={artists} length={artists.length} type="artist" />
                )}
                {playlists.length > 0 && (
                    <DashBoard title="Playlist nổi bật" data={playlists} length={playlists.length} type="playlist" />
                )}
            </div>
        </>
    )
}

export default Search
