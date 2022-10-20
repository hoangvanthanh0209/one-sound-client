// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import meService from './meService'

// const initialState = {
//     playlists: {
//         data: [],
//         pagination: {},
//     },
//     songs: {
//         data: [],
//         pagination: {},
//     },
//     isReloadMe: false,
//     isLoadingMe: false,
//     isErrorMe: false,
//     isSuccessMe: false,
//     successMessageMe: '',
//     errorMessageMe: '',
//     listErrorMessageMe: [],
// }

// // get playlists
// export const getPlaylists = createAsyncThunk('me/getPlaylists', async (filters, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await meService.getPlaylists(filters, token)
//     } catch (error) {
//         const message =
//             (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// // add playlist
// export const createPlaylist = createAsyncThunk('me/createPlaylist', async (playlistData, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await meService.createPlaylist(playlistData, token)
//     } catch (error) {
//         const message =
//             (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// // update playlist
// export const updatePlaylist = createAsyncThunk('me/updatePlaylist', async (playlistData, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await meService.updatePlaylist(playlistData, token)
//     } catch (error) {
//         const message =
//             (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// // delete playlist
// export const deletePlaylist = createAsyncThunk('me/deletePlaylist', async (playlistId, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await meService.deletePlaylist(playlistId, token)
//     } catch (error) {
//         const message =
//             (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// // get song of playlist
// export const getSongOfPlaylist = createAsyncThunk('me/getSongOfPlaylist', async (playlistId, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await meService.getSongOfPlaylist(playlistId, token)
//     } catch (error) {
//         const message =
//             (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// // create song
// export const createSong = createAsyncThunk('me/createSong', async (songData, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await meService.createSong(songData, token)
//     } catch (error) {
//         const message =
//             (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// // update playlist
// export const updateSong = createAsyncThunk('me/updateSong', async (songData, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await meService.updateSong(songData, token)
//     } catch (error) {
//         const message =
//             (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// // delete playlist
// export const deleteSong = createAsyncThunk('me/deleteSong', async (songId, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await meService.deleteSong(songId, token)
//     } catch (error) {
//         const message =
//             (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// export const meSlice = createSlice({
//     name: 'me',
//     initialState,
//     reducers: {
//         resetMe: (state) => {
//             state.isReloadMe = false
//             state.isLoadingMe = false
//             state.isErrorMe = false
//             state.isSuccessMe = false
//             state.successMessageMe = ''
//             state.errorMessageMe = ''
//             state.listErrorMessageMe = []
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getPlaylists.pending, (state) => {
//                 state.isLoadingMe = true
//             })
//             .addCase(getPlaylists.fulfilled, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isSuccessMe = true
//                 state.playlists = action.payload
//             })
//             .addCase(getPlaylists.rejected, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isErrorMe = true
//                 state.errorMessageMe = action.payload
//             })

//             .addCase(createPlaylist.pending, (state) => {
//                 state.isLoadingMe = true
//             })
//             .addCase(createPlaylist.fulfilled, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isSuccessMe = true
//                 // state.playlists.data.push(action.payload)
//                 state.isReloadMe = true
//             })
//             .addCase(createPlaylist.rejected, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isErrorMe = true
//                 state.errorMessageMe = action.payload
//             })

//             .addCase(updatePlaylist.pending, (state) => {
//                 state.isLoadingMe = true
//             })
//             .addCase(updatePlaylist.fulfilled, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isSuccessMe = true
//                 state.isReloadMe = true

//                 // const index = state.playlists.data.findIndex((playlist) => {
//                 //     return playlist.id === action.payload.id
//                 // })
//                 // index !== -1 && (state.playlists.data[index] = action.payload) && (state.isReloadMe = true)
//             })
//             .addCase(updatePlaylist.rejected, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isErrorMe = true
//                 state.errorMessageMe = action.payload
//             })

//             .addCase(deletePlaylist.pending, (state) => {
//                 state.isLoadingMe = true
//             })
//             .addCase(deletePlaylist.fulfilled, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isSuccessMe = true
//                 state.isReloadMe = true

//                 // const index = state.playlists.data.findIndex((playlist) => {
//                 //     return playlist.id === action.payload.id
//                 // })
//                 // index !== -1 && state.playlists.data.splice(index, 1) && (state.isReloadMe = true)
//             })
//             .addCase(deletePlaylist.rejected, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isErrorMe = true
//                 state.errorMessageMe = action.payload
//             })

//             .addCase(getSongOfPlaylist.pending, (state) => {
//                 state.isLoadingMe = true
//             })
//             .addCase(getSongOfPlaylist.fulfilled, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isSuccessMe = true
//                 state.currentPlaylist = action.payload.playlist
//                 state.songs = action.payload.songs
//             })
//             .addCase(getSongOfPlaylist.rejected, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isErrorMe = true
//                 state.errorMessageMe = action.payload
//             })

//             .addCase(createSong.pending, (state) => {
//                 state.isLoadingMe = true
//             })
//             .addCase(createSong.fulfilled, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isSuccessMe = true
//                 state.songs.data.push(action.payload)
//             })
//             .addCase(createSong.rejected, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isErrorMe = true
//                 state.errorMessageMe = action.payload
//             })

//             .addCase(updateSong.pending, (state) => {
//                 state.isLoadingMe = true
//             })
//             .addCase(updateSong.fulfilled, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isSuccessMe = true

//                 const index = state.songs.data.findIndex((song) => {
//                     return song.id === action.payload.id
//                 })
//                 index !== -1 && (state.songs.data[index] = action.payload)
//             })
//             .addCase(updateSong.rejected, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isErrorMe = true
//                 state.errorMessageMe = action.payload
//             })

//             .addCase(deleteSong.pending, (state) => {
//                 state.isLoadingMe = true
//             })
//             .addCase(deleteSong.fulfilled, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isSuccessMe = true

//                 const index = state.songs.data.findIndex((song) => {
//                     return song.id === action.payload.id
//                 })
//                 index !== -1 && state.songs.data.splice(index, 1)
//             })
//             .addCase(deleteSong.rejected, (state, action) => {
//                 state.isLoadingMe = false
//                 state.isErrorMe = true
//                 state.errorMessageMe = action.payload
//             })
//     },
// })

// export const { resetMe } = meSlice.actions

// export default meSlice.reducer
