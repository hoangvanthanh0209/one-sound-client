import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import MyError from '~/utils/error'
import { DashBoard } from '~/components'
import { resetColor } from '~/redux/config/configSlice'
import playlistService from '~/redux/playlist/playlistService'
import artistService from '~/redux/artist/artistService'

function Home() {
    const dispatch = useDispatch()

    const [playlists, setPlaylists] = useState([])
    const [artists, setArtists] = useState([])
    const [error, setError] = useState('')
    const [filters, setFiters] = useState({
        page: null,
        limit: null,
        name: null,
        typeSort: null,
    })

    const getPlaylists = async () => {
        try {
            const respon = await playlistService.getPlaylists()
            setPlaylists(respon)
        } catch (error) {
            console.log(error)
            const message = MyError.getError(error)
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
            const message = MyError.getError(error)
            setError(message)
        }
    }

    useEffect(() => {
        dispatch(resetColor())
        getPlaylists()
    }, [])

    useEffect(() => {
        getArtists(filters)
    }, [filters])

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    return (
        <div className="flex flex-col gap-6 w-full">
            {playlists?.map((playlist) => {
                return (
                    <DashBoard
                        key={playlist.categoryId}
                        title={playlist.categoryName}
                        data={playlist.data}
                        categoryId={playlist.categoryId}
                        categorySlug={playlist.categorySlug}
                        isLimit={true}
                    />
                )
            })}
            <DashBoard title="Nghệ sĩ nổi bật" data={artists} type="artist" isLimit={true} />
        </div>
    )
}

export default Home
