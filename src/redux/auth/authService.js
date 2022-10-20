import axios from 'axios'

const API_URL_USER = 'https://one-sound-hvt.herokuapp.com/api/users/'
const API_URL_ME = 'https://one-sound-hvt.herokuapp.com/api/me/'

// Register user
const register = async (userData) => {
    const res = await axios.post(API_URL_USER, userData)

    return res.data
}

// Login user
const login = async (userData) => {
    const res = await axios.post(API_URL_USER + 'login', userData)

    return res.data
}

// User change password
const changePassword = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const res = await axios.put(API_URL_ME + 'changePassword', userData, config)

    return res.data
}

// update info user
const updateInfo = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const res = await axios.put(API_URL_ME, userData, config)

    return res.data
}

const authService = { register, login, changePassword, updateInfo }

export default authService
