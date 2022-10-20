import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: '',
    playlistId: '',
    userId: '',
    playlistIdMe: '',
    isReloadPlaylist: false,
    isReloadSong: false,
    isLoading: false,
}

export const currentSlice = createSlice({
    name: 'current',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setPlaylistId: (state, action) => {
            state.playlistId = action.payload
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setPlaylistIdMe: (state, action) => {
            state.playlistIdMe = action.payload
        },
        reloadPlaylist: (state) => {
            state.isReloadPlaylist = true
        },
        resetReloadPlaylist: (state) => {
            state.isReloadPlaylist = false
        },
        reloadSong: (state) => {
            state.isReloadSong = true
        },
        resetReloadSong: (state) => {
            state.isReloadSong = false
        },
        setLoading: (state) => {
            state.isLoading = true
        },
        resetLoading: (state) => {
            state.isLoading = false
        },
    },
})

export const {
    setCategoryId,
    setPlaylistId,
    setUserId,
    setPlaylistIdMe,
    reloadPlaylist,
    resetReloadPlaylist,
    reloadSong,
    resetReloadSong,
    setLoading,
    resetLoading,
} = currentSlice.actions

export default currentSlice.reducer
