import axios from 'axios'

// const API_URL = 'https://one-sound-hvt.herokuapp.com/api/me/'
const API_URL = 'https://one-sound-server.onrender.com/api/me/'

const config = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
}

// get playlists
const getPlaylists = async (filters, token) => {
    const { page, limit, name } = filters

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
            limit,
            name,
        },
    }
    const res = await axios.get(API_URL + 'playlist', config)

    return res.data
}

// get songs by playlist id
const getSongsByPlaylistId = async (filters, token) => {
    const { playlistId, page, limit, name } = filters

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            playlistId,
            page,
            limit,
            name,
        },
    }
    const res = await axios.get(API_URL + 'song', config)

    return res.data
}

// add playlist
const createPlaylist = async (playlistData, token) => {
    const res = await axios.post(API_URL + 'playlist', playlistData, config(token))

    return res.status
}

// update playlist
const updatePlaylist = async (playlistData, token) => {
    const id = playlistData.get('id')

    const res = await axios.put(API_URL + 'playlist/' + id, playlistData, config(token))

    return res.status
}

// delete playlist
const deletePlaylist = async (playlistId, token) => {
    const res = await axios.delete(API_URL + 'playlist/' + playlistId, config(token))

    return res.status
}

// get song of playlist
const getSongOfPlaylist = async (playlistId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            playlistId,
        },
    }

    const res = await axios.get(API_URL + 'playlist/getInfoAndSong', config)

    return res.data
}

// add song
const createSong = async (data, token) => {
    const { songData, playlistId } = data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            playlist: playlistId,
        },
    }

    const res = await axios.post(API_URL + 'song', songData, config)

    return res.status
}

// add song
const updateSong = async (songData, token) => {
    const id = songData.get('id')

    const res = await axios.put(API_URL + 'song/' + id, songData, config(token))

    return res.status
}

// delete song
const deleteSong = async (songId, token) => {
    const res = await axios.delete(API_URL + 'song/' + songId, config(token))

    return res.status
}

const meService = {
    createPlaylist,
    getPlaylists,
    getSongsByPlaylistId,
    updatePlaylist,
    deletePlaylist,
    getSongOfPlaylist,
    createSong,
    updateSong,
    deleteSong,
}

export default meService
