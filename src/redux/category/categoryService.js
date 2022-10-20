import axios from 'axios'

const API_URL = 'https://one-sound-hvt.herokuapp.com/api/categories/'

// get categories
const getCategories = async () => {
    const res = await axios.get(API_URL)

    return res.data
}

const categoryService = { getCategories }

export default categoryService
