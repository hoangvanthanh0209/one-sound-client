import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: '',
    playlistId: '',
    userId: '',
    playlistIdMe: '',
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
    },
})

export const { setCategoryId, setPlaylistId, setUserId, setPlaylistIdMe } = currentSlice.actions

export default currentSlice.reducer
