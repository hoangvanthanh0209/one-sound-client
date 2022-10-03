import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import songService from './songService'

const initialState = {
    songs: [],
    isLoadingSong: false,
    isSuccessSong: false,
    isErrorSong: false,
    successMessageSong: '',
    errorMessageSong: '',
    listErrorMessageSong: [],
}

// get songs of playlist
export const getSongsByPlaylistId = createAsyncThunk('song/getSongsByPlaylistId', async (playlistId, thunkAPI) => {
    try {
        return await songService.getSongsByPlaylistId(playlistId)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get popular songs by user id
export const getPopulaSongsByUserId = createAsyncThunk('song/getPopulaSongsByUserId', async (userId, thunkAPI) => {
    try {
        return await songService.getPopulaSongsByUserId(userId)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// like song
export const likeSong = createAsyncThunk('playlist/likeSong', async (songId, thunkAPI) => {
    try {
        return await songService.likeSong(songId)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        resetSong: (state) => {
            state.isLoadingSong = false
            state.isSuccessSong = false
            state.isErrorSong = false
            state.successMessageSong = ''
            state.errorMessageSong = ''
            state.listErrorMessageSong = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSongsByPlaylistId.pending, (state) => {
                state.isLoadingSong = true
            })
            .addCase(getSongsByPlaylistId.fulfilled, (state, action) => {
                state.isLoadingSong = false
                state.isSuccessSong = true
                state.songs = action.payload
            })
            .addCase(getSongsByPlaylistId.rejected, (state, action) => {
                state.isLoadingSong = true
                state.isErrorSong = false
                state.errorMessageSong = action.payload
            })

            .addCase(getPopulaSongsByUserId.pending, (state) => {
                state.isLoadingSong = true
            })
            .addCase(getPopulaSongsByUserId.fulfilled, (state, action) => {
                state.isLoadingSong = false
                state.isSuccessSong = true
                state.songs = action.payload
            })
            .addCase(getPopulaSongsByUserId.rejected, (state, action) => {
                state.isLoadingSong = false
                state.isErrorSong = true
                state.errorMessageSong = action.payload
            })

            .addCase(likeSong.pending, (state) => {
                state.isLoadingSong = true
            })
            .addCase(likeSong.fulfilled, (state, action) => {
                state.isLoadingSong = false
                state.isSuccessSong = true
                const index = state.songs.findIndex((song) => {
                    return song.id === action.payload.id
                })

                index !== -1 && (state.songs[index].likeCount = action.payload.likeCount)
            })
            .addCase(likeSong.rejected, (state, action) => {
                state.isLoadingSong = true
                state.isErrorSong = false
                state.errorMessageSong = action.payload
            })
    },
})

export const { resetSong } = songSlice.actions

export default songSlice.reducer
