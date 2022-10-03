import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import artistService from './artistService'

const initialState = {
    artists: [],
    currentArtist: {},
    isLoadingArtist: false,
    isSuccessArtist: false,
    isErrorArtist: false,
    errorMessageArtist: '',
    successMessageArtist: '',
    listErrorMessageArtist: [],
}

// get top artists
export const getTopArtist = createAsyncThunk('artist/getTopArtist', async (topNumber, thunkAPI) => {
    try {
        return await artistService.getTopArtist(topNumber)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get artist by id
export const getArtistById = createAsyncThunk('artist/getArtistById', async (artistId, thunkAPI) => {
    try {
        return await artistService.getArtistById(artistId)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get top artists farvourite
export const getTopArtistsFavourite = createAsyncThunk('artist/getTopArtistsFavourite', async (top, thunkAPI) => {
    try {
        return await artistService.getTopArtistsFavourite(top)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get artists by name
export const getArtistsByName = createAsyncThunk('artist/getArtistsByName', async (name, thunkAPI) => {
    try {
        return await artistService.getArtistsByName(name)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// like artist
export const likeArtist = createAsyncThunk('artist/likeArtist', async (artistId, thunkAPI) => {
    try {
        return await artistService.likeArtist(artistId)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        resetArtist: (state) => {
            state.isLoadingArtist = false
            state.isSuccessArtist = false
            state.isErrorArtist = false
            state.errorMessageArtist = ''
            state.successMessageArtist = ''
            state.listErrorMessageArtist = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTopArtist.pending, (state) => {
                state.isLoadingArtist = true
            })
            .addCase(getTopArtist.fulfilled, (state, action) => {
                state.isLoadingArtist = false
                state.isSuccessArtist = true
                state.artists = action.payload
            })
            .addCase(getTopArtist.rejected, (state, action) => {
                state.isLoadingArtist = false
                state.isErrorArtist = true
                state.errorMessageArtist = action.payload
            })

            .addCase(getArtistById.pending, (state) => {
                state.isLoadingArtist = true
            })
            .addCase(getArtistById.fulfilled, (state, action) => {
                state.isLoadingArtist = false
                state.isSuccessArtist = true
                state.currentArtist = action.payload
            })
            .addCase(getArtistById.rejected, (state, action) => {
                state.isLoadingArtist = false
                state.isErrorArtist = true
                state.errorMessageArtist = action.payload
            })

            .addCase(getTopArtistsFavourite.pending, (state) => {
                state.isLoadingArtist = true
            })
            .addCase(getTopArtistsFavourite.fulfilled, (state, action) => {
                state.isLoadingArtist = false
                state.isSuccessArtist = true
                state.artists = action.payload
            })
            .addCase(getTopArtistsFavourite.rejected, (state, action) => {
                state.isLoadingArtist = false
                state.isErrorArtist = true
                state.errorMessageArtist = action.payload
            })

            .addCase(getArtistsByName.pending, (state) => {
                state.isLoadingArtist = true
            })
            .addCase(getArtistsByName.fulfilled, (state, action) => {
                state.isLoadingArtist = false
                state.isSuccessArtist = true
                state.artists = action.payload
            })
            .addCase(getArtistsByName.rejected, (state, action) => {
                state.isLoadingArtist = false
                state.isErrorArtist = true
                state.errorMessageArtist = action.payload
            })

            .addCase(likeArtist.pending, (state) => {
                state.isLoadingArtist = true
            })
            .addCase(likeArtist.fulfilled, (state, action) => {
                state.isLoadingArtist = false
                state.isSuccessArtist = true
                state.currentArtist.likeCount = action.payload.likeCount
            })
            .addCase(likeArtist.rejected, (state, action) => {
                state.isLoadingArtist = true
                state.isErrorSong = false
                state.errorMessageSong = action.payload
            })
    },
})

export const { resetArtist } = artistSlice.actions

export default artistSlice.reducer
