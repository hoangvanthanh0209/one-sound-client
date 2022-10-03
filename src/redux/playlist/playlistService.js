import axios from 'axios'

const API_URL = '/api/playlists/'

// get playlists
const getPlaylists = async () => {
    const res = await axios.get(API_URL)

    return res.data
}

// get playlist
const getPlaylistById = async (playlistId) => {
    const res = await axios.get(API_URL + playlistId)

    return res.data
}

// get playlists by userid
const getPlaylistsByUserId = async (userId) => {
    const config = {
        params: {
            userId,
        },
    }
    const res = await axios.get(API_URL + 'getByUser', config)

    return res.data
}

// get top playlist farvourite
const getTopPlaylistsFavourite = async (topNumber) => {
    const config = {
        params: {
            top: topNumber,
        },
    }

    const res = await axios.get(API_URL + 'top', config)

    return res.data
}

// get playlists by name
const getPlaylistsByName = async (name) => {
    const config = {
        params: {
            name: name,
        },
    }

    const res = await axios.get(API_URL + 'search', config)

    return res.data
}

// like playlist
const likePlaylist = async (playlistId) => {
    const res = await axios.put(API_URL + 'like/' + playlistId)

    return res.data
}

const playlistService = {
    getPlaylists,
    getPlaylistById,
    getPlaylistsByUserId,
    getTopPlaylistsFavourite,
    getPlaylistsByName,
    likePlaylist,
}

export default playlistService
