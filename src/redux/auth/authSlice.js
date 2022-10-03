import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
    user: null,
    isErrorAuth: false,
    isSuccessAuth: false,
    isLoadingAuth: false,
    successMessageAuth: '',
    errorMessageAuth: '',
    listErrorMessageAuth: [],
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// User change password
export const changePassword = createAsyncThunk('auth/changePassword', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.changePassword(userData, token)
    } catch (error) {
        const type = error.response.data.typeError
        const message =
            type === 'string'
                ? (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString()
                : (error.response && error.response.data && error.response.data.listError) ||
                  error.message ||
                  error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update user info
export const updateInfo = createAsyncThunk('auth/update', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.updateInfo(userData, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.isErrorAuth = false
            state.isSuccessAuth = false
            state.isLoadingAuth = false
            state.successMessageAuth = ''
            state.errorMessageAuth = ''
            state.listErrorMessageAuth = []
        },
        logout: (state) => {
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoadingAuth = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoadingAuth = false
                state.isSuccessAuth = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoadingAuth = false
                state.isErrorAuth = true
                state.errorMessageAuth = action.payload
                state.user = null
            })

            .addCase(login.pending, (state) => {
                state.isLoadingAuth = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoadingAuth = false
                state.isSuccessAuth = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoadingAuth = false
                state.isErrorAuth = true
                state.errorMessageAuth = action.payload
                state.user = null
            })

            .addCase(changePassword.pending, (state) => {
                state.isLoadingAuth = true
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.isLoadingAuth = false
                state.isSuccessAuth = true
                state.successMessageAuth = action.payload
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoadingAuth = false
                state.isErrorAuth = true
                state.listErrorMessageAuth = action.payload
            })

            .addCase(updateInfo.pending, (state) => {
                state.isLoadingAuth = true
            })
            .addCase(updateInfo.fulfilled, (state, action) => {
                state.isLoadingAuth = false
                state.isSuccessAuth = true
                state.user = action.payload
            })
            .addCase(updateInfo.rejected, (state, action) => {
                state.isLoadingAuth = false
                state.isErrorAuth = true
                state.errorMessageAuth = action.payload
            })
    },
})

export const { resetAuth, logout } = authSlice.actions
export default authSlice.reducer
