import axios from 'axios'

const API_URL = '/api/me/'

const config = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
}

// get playlists
const getPlaylists = async (token) => {
    const res = await axios.get(API_URL + 'playlist', config(token))

    return res.data
}

// add playlist
const createPlaylist = async (playlistData, token) => {
    const res = await axios.post(API_URL + 'playlist', playlistData, config(token))

    return res.data
}

// update playlist
const updatePlaylist = async (playlistData, token) => {
    const id = playlistData.get('id')

    const res = await axios.put(API_URL + 'playlist/' + id, playlistData, config(token))

    return res.data
}

// delete playlist
const deletePlaylist = async (playlistId, token) => {
    const res = await axios.delete(API_URL + 'playlist/' + playlistId, config(token))

    return res.data
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

    const res = await axios.post(API_URL + 'playlist/song', songData, config)

    return res.data
}

// add song
const updateSong = async (songData, token) => {
    const id = songData.get('id')

    const res = await axios.put(API_URL + 'playlist/song/' + id, songData, config(token))

    return res.data
}

// delete song
const deleteSong = async (songId, token) => {
    const res = await axios.delete(API_URL + 'playlist/song/' + songId, config(token))

    return res.data
}

const meService = {
    createPlaylist,
    getPlaylists,
    updatePlaylist,
    deletePlaylist,
    getSongOfPlaylist,
    createSong,
    updateSong,
    deleteSong,
}

export default meService
