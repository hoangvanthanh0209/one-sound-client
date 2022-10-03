import axios from 'axios'

const API_URL = '/api/users/'

// get top artist
const getTopArtist = async (topNumber) => {
    const topArtist = 10
    const config = {
        params: {
            top: topNumber || topArtist,
        },
    }
    const res = await axios.get(API_URL + 'top', config)

    return res.data
}

// get artist by id
const getArtistById = async (artistId) => {
    const res = await axios.get(API_URL + artistId)

    return res.data
}

// get top artists farvourite
const getTopArtistsFavourite = async (topNumber) => {
    const config = {
        params: {
            top: topNumber,
        },
    }

    const res = await axios.get(API_URL + 'top', config)

    return res.data
}

// get artists by name
const getArtistsByName = async (name) => {
    const config = {
        params: {
            name: name,
        },
    }

    const res = await axios.get(API_URL + 'search', config)

    return res.data
}

// like artist
const likeArtist = async (userId) => {
    const res = await axios.put(API_URL + 'like/' + userId)

    return res.data
}

const artistService = {
    getTopArtist,
    getArtistById,
    getTopArtistsFavourite,
    getArtistsByName,
    likeArtist,
}

export default artistService
