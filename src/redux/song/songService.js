import axios from 'axios'

const API_URL = 'https://one-sound-hvt.herokuapp.com/api/songs/'

// get songs of playlist
const getSongsByPlaylistId = async (playlistId) => {
    const config = {
        params: {
            playlistId: playlistId,
        },
    }
    const res = await axios.get(API_URL + 'getSongsByPlaylistId', config)

    return res.data
}

// get popular song by userid
const getPopulaSongsByUserId = async (userId) => {
    const config = {
        params: {
            userId,
        },
    }

    const res = await axios.get(API_URL + 'getPopularSongByUserId', config)

    return res.data
}

// like song
const likeSong = async (songId) => {
    const res = await axios.put(API_URL + 'like/' + songId)

    return res.data
}

const songService = { getSongsByPlaylistId, getPopulaSongsByUserId, likeSong }

export default songService
