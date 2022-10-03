import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import playlistService from './playlistService'

const initialState = {
    playlists: [],
    currentPlaylist: {},
    isLoadingPlaylist: false,
    isSuccessPlaylist: false,
    isErrorPlaylist: false,
    successMessagePlaylist: '',
    errorMessagePlaylist: '',
    listErrorMessagePlaylist: [],
}

// get playlists
export const getPlaylists = createAsyncThunk('playlist/fetch', async (_, thunkAPI) => {
    try {
        return await playlistService.getPlaylists()
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get playlist by id
export const getPlaylistById = createAsyncThunk('playlist/getPlaylistById', async (playlistId, thunkAPI) => {
    try {
        return await playlistService.getPlaylistById(playlistId)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get playlist by userid
export const getPlaylistsByUserId = createAsyncThunk('playlist/getPlaylistsByUserId', async (userId, thunkAPI) => {
    try {
        return await playlistService.getPlaylistsByUserId(userId)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get top playlist farvourite
export const getTopPlaylistsFavourite = createAsyncThunk('playlist/getTopPlaylistsFavourite', async (top, thunkAPI) => {
    try {
        return await playlistService.getTopPlaylistsFavourite(top)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get playlists by name
export const getPlaylistsByName = createAsyncThunk('playlist/getPlaylistsByName', async (name, thunkAPI) => {
    try {
        return await playlistService.getPlaylistsByName(name)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// like playlist
export const likePlaylist = createAsyncThunk('playlist/likePlaylist', async (playlistId, thunkAPI) => {
    try {
        return await playlistService.likePlaylist(playlistId)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        resetPlaylist: (state) => {
            state.isLoadingPlaylist = false
            state.isSuccessPlaylist = false
            state.isErrorPlaylist = false
            state.successMessagePlaylist = ''
            state.errorMessagePlaylist = ''
            state.listErrorMessagePlaylist = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPlaylists.pending, (state) => {
                state.isLoadingPlaylist = true
            })
            .addCase(getPlaylists.fulfilled, (state, action) => {
                state.isLoadingPlaylist = false
                state.isSuccessPlaylist = true
                state.playlists = action.payload
            })
            .addCase(getPlaylists.rejected, (state, action) => {
                state.isLoadingPlaylist = true
                state.isErrorPlaylist = false
                state.errorMessagePlaylist = action.payload
            })

            .addCase(getPlaylistById.pending, (state) => {
                state.isLoadingPlaylist = true
            })
            .addCase(getPlaylistById.fulfilled, (state, action) => {
                state.isLoadingPlaylist = false
                state.isSuccessPlaylist = true
                state.currentPlaylist = action.payload
            })
            .addCase(getPlaylistById.rejected, (state, action) => {
                state.isLoadingPlaylist = true
                state.isErrorPlaylist = false
                state.errorMessagePlaylist = action.payload
            })

            .addCase(getPlaylistsByUserId.pending, (state) => {
                state.isLoadingPlaylist = true
            })
            .addCase(getPlaylistsByUserId.fulfilled, (state, action) => {
                state.isLoadingPlaylist = false
                state.isSuccessPlaylist = true
                state.playlists = action.payload
            })
            .addCase(getPlaylistsByUserId.rejected, (state, action) => {
                state.isLoadingPlaylist = true
                state.isErrorPlaylist = false
                state.errorMessagePlaylist = action.payload
            })

            .addCase(getTopPlaylistsFavourite.pending, (state) => {
                state.isLoadingPlaylist = true
            })
            .addCase(getTopPlaylistsFavourite.fulfilled, (state, action) => {
                state.isLoadingPlaylist = false
                state.isSuccessPlaylist = true
                state.playlists = action.payload
            })
            .addCase(getTopPlaylistsFavourite.rejected, (state, action) => {
                state.isLoadingPlaylist = true
                state.isErrorPlaylist = false
                state.errorMessagePlaylist = action.payload
            })

            .addCase(getPlaylistsByName.pending, (state) => {
                state.isLoadingPlaylist = true
            })
            .addCase(getPlaylistsByName.fulfilled, (state, action) => {
                state.isLoadingPlaylist = false
                state.isSuccessPlaylist = true
                state.playlists = action.payload
            })
            .addCase(getPlaylistsByName.rejected, (state, action) => {
                state.isLoadingPlaylist = true
                state.isErrorPlaylist = false
                state.errorMessagePlaylist = action.payload
            })

            .addCase(likePlaylist.pending, (state) => {
                state.isLoadingPlaylist = true
            })
            .addCase(likePlaylist.fulfilled, (state, action) => {
                state.isLoadingPlaylist = false
                state.isSuccessPlaylist = true
                const indexCategory = state.playlists.findIndex((category) => {
                    return category.categoryId === action.payload.categoryId
                })
                if (indexCategory !== -1) {
                    const playlists = [...state.playlists[indexCategory].data]
                    const indexPlaylist = playlists.findIndex((playlist) => {
                        return playlist.id === action.payload.id
                    })

                    indexPlaylist !== -1 &&
                        (state.playlists[indexCategory].data[indexPlaylist].likeCount = action.payload.likeCount)
                }
            })
            .addCase(likePlaylist.rejected, (state, action) => {
                state.isLoadingPlaylist = true
                state.isErrorPlaylist = false
                state.errorMessagePlaylist = action.payload
            })
    },
})

export const { resetPlaylist } = playlistSlice.actions

export default playlistSlice.reducer
