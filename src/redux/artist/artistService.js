import axios from 'axios'

// const API_URL = 'https://one-sound-hvt.herokuapp.com/api/users/'
const API_URL = 'https://one-sound-server.onrender.com/api/users/'

// get artist by id
const getArtistById = async (artistId) => {
    const res = await axios.get(API_URL + artistId)

    return res.data
}

// get artists
const getArtists = async (options) => {
    const { page, limit, name, typeSort } = options
    const config = {
        params: {
            page,
            limit,
            name,
            typeSort,
        },
    }

    const res = await axios.get(API_URL + 'get', config)

    return res.data
}

// like artist
const likeArtist = async (userId) => {
    const res = await axios.put(API_URL + 'like/' + userId)

    return res.status
}

const artistService = {
    getArtistById,
    getArtists,
    likeArtist,
}

export default artistService
