import axios from 'axios'

// const API_URL = 'https://one-sound-hvt.herokuapp.com/api/playlists/'
const API_URL = 'https://one-sound-server.onrender.com/api/playlists/'

// get playlists
const getPlaylists = async () => {
    const res = await axios.get(API_URL)

    return res.data
}

// get playlists
const getPlaylistsForPage = async (filters) => {
    const { page, limit, name } = filters
    const config = {
        params: {
            page,
            limit,
            name,
        },
    }
    const res = await axios.get(API_URL + 'get', config)

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
    const res = await axios.get(API_URL + 'getPlaylistsByUserId', config)

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

const getPlaylistsByCategoryId = async (filters) => {
    const { categoryId, page, limit, name } = filters
    const config = {
        params: {
            categoryId,
            page,
            limit,
            name,
        },
    }

    const res = await axios.get(API_URL + 'getByCategory', config)

    return res.data
}

// like playlist
const likePlaylist = async (playlistId) => {
    const res = await axios.put(API_URL + 'like/' + playlistId)

    return res.status
}

const playlistService = {
    getPlaylists,
    getPlaylistsForPage,
    getPlaylistById,
    getPlaylistsByUserId,
    getTopPlaylistsFavourite,
    getPlaylistsByName,
    getPlaylistsByCategoryId,
    likePlaylist,
}

export default playlistService
