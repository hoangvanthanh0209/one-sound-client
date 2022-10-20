import { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import myError from '~/utils/error'
import { DashBoard, Pagination } from '~/components'
import { currentSelector } from '~/redux/selector'
import playlistService from '~/redux/playlist/playlistService'

function Category() {
    const { categoryId } = useSelector(currentSelector)

    const [searchValue, setsearchValue] = useState('')
    const [category, setCategory] = useState({})
    const [playlists, setPlaylists] = useState([])
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 0,
        totalRows: 0,
    })
    const [filters, setFilters] = useState({
        categoryId,
        page: 1,
        limit: 16,
        name: '',
    })
    const [error, setError] = useState('')

    const inputRef = useRef()
    const btnSearchRef = useRef()

    const handleInputChange = (e) => {
        const value = e.target.value
        setsearchValue(value)
    }

    const handleSearchBtnClick = () => {
        setFilters((prevData) => {
            return { ...prevData, name: searchValue }
        })
    }

    const handleEnterKeyUp = (e) => {
        if (e.key === 'Enter') {
            btnSearchRef.current.click()
        }
    }

    const handlePagechange = (newPage) => {
        setFilters((prevData) => {
            return { ...prevData, page: newPage }
        })
    }

    const getPlaylistsByCategoryId = async (filters) => {
        try {
            const respon = await playlistService.getPlaylistsByCategoryId(filters)
            const { category, playlists, pagination } = respon
            setCategory(category)
            setPlaylists(playlists)
            setPagination(pagination)
        } catch (error) {
            console.log(error)
            const message = myError.getError(error)
            setError(message)
        }
    }

    useEffect(() => {
        getPlaylistsByCategoryId(filters)
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
            </div>
            <div className="flex flex-col gap-6 w-full">
                <div className="h-[600px]">
                    <DashBoard title={category?.name} data={playlists} isShowMore={false} />
                </div>
                <Pagination pagination={pagination} onPageChange={handlePagechange} />
            </div>
        </>
    )
}

export default Category
