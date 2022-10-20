import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import musicService from './musicService'

const initialState = {
    playlist: {},
    songs: [],
    currentSong: {},
    indexSong: null,
    indexList: [],
    indexPlayedList: [],
    isRepeat: false,
    isRandom: false,
    isPlaying: false,
    isLoadingMusic: false,
    isSuccessMusic: false,
    isErrorMusic: false,
    errorMessageMusic: '',
    successMessageMusic: '',
    listErrorMessageMusic: [],
}

export const playPlaylistById = createAsyncThunk('music/getSongByPlaylistId', async (playlistId, thunkAPI) => {
    try {
        return await musicService.getSongByPlaylistId(playlistId)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        resetMusic: (state) => {
            state.isLoadingMusic = false
            state.isSuccessMusic = false
            state.isErrorMusic = false
            state.errorMessageMusic = ''
            state.successMessageMusic = ''
            state.listErrorMessageMusic = {}
        },
        nextSong: (state) => {
            const length = state.songs.length - 1
            const index = state.indexSong === length ? 0 : state.indexSong + 1
            state.indexSong = index
            state.currentSong = state.songs[index]
            // state.isRandom && !state.indexPlayedList.includes(index) && state.indexPlayedList.push(index)
            !state.isRandom && (state.indexPlayedList = [])
        },
        prevSong: (state) => {
            const length = state.songs.length - 1
            const index = state.indexSong === 0 ? length : state.indexSong - 1
            state.indexSong = index
            state.currentSong = state.songs[index]
            // state.isRandom && !state.indexPlayedList.includes(index) && state.indexPlayedList.push(index)
            !state.isRandom && (state.indexPlayedList = [])
        },
        nextSongWithRandom: (state) => {
            const arrayIndexList = JSON.stringify([...state.indexList].sort())
            const arrayIndexPlayedList = JSON.stringify([...state.indexPlayedList].sort())
            if (arrayIndexList === arrayIndexPlayedList) {
                state.indexSong = 0
                state.currentSong = state.songs[0]
                state.indexPlayedList = []
                state.isPlaying = false
            } else {
                let newIndex, isCheck
                newIndex = Math.floor(Math.random() * state.songs.length)
                isCheck = state.indexPlayedList.includes(newIndex)
                while (isCheck) {
                    // neu da ton tai thi chay lai vong lap
                    newIndex = Math.floor(Math.random() * state.songs.length)
                    isCheck = state.indexPlayedList.includes(newIndex)
                }
                state.indexSong = newIndex
                state.currentSong = state.songs[newIndex]
                state.indexPlayedList.push(newIndex)
            }
        },
        prevSongWithRandom: (state) => {
            const arrayIndexList = JSON.stringify([...state.indexList].sort())
            const arrayIndexPlayedList = JSON.stringify([...state.indexPlayedList].sort())
            if (arrayIndexList === arrayIndexPlayedList) {
                state.indexSong = 0
                state.currentSong = state.songs[0]
                state.indexPlayedList = []
                state.isPlaying = false
            } else {
                let newIndex, isCheck
                newIndex = Math.floor(Math.random() * state.songs.length)
                isCheck = state.indexPlayedList.includes(newIndex)
                while (isCheck) {
                    // neu da ton tai thi chay lai vong lap
                    newIndex = Math.floor(Math.random() * state.songs.length)
                    isCheck = state.indexPlayedList.includes(newIndex)
                }
                state.indexSong = newIndex
                state.currentSong = state.songs[newIndex]
                state.indexPlayedList.push(newIndex)
            }
        },
        playSong: (state, action) => {
            state.currentSong = action.payload.song
            state.indexSong = action.payload.index
        },
        setRepeat: (state, action) => {
            state.isRepeat = action.payload
        },
        setRandom: (state, action) => {
            state.isRandom = action.payload
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(playPlaylistById.pending, (state) => {
                state.isLoadingMusic = true
            })
            .addCase(playPlaylistById.fulfilled, (state, action) => {
                state.isLoadingMusic = false
                state.isSuccessMusic = true
                state.playlist = action.payload.playlist
                state.songs = action.payload.songs
                state.isPlaying = true
                state.currentSong = action.payload.songs[0]
                state.indexSong = 0

                const indexs = action.payload.songs.map((song, index) => {
                    return index
                })
                state.indexList = indexs
                state.indexPlayedList = []
            })
            .addCase(playPlaylistById.rejected, (state, action) => {
                state.isLoadingMusic = false
                state.isErrorMusic = true
                state.errorMessageMusic = action.payload
            })
    },
})

export const {
    resetMusic,
    nextSong,
    prevSong,
    nextSongWithRandom,
    prevSongWithRandom,
    playSong,
    setRepeat,
    setRandom,
    setIsPlaying,
} = musicSlice.actions

export default musicSlice.reducer
