import axios from 'axios'

const API_URL_SONG = '/api/songs/'

// get song of playlist
const getSongByPlaylistId = async (playlistId) => {
    const config = {
        params: {
            playlistId,
        },
    }

    const res = await axios.get(API_URL_SONG + 'getSongAndPlaylistInfo', config)

    return res.data
}

const musicService = { getSongByPlaylistId }

export default musicService
