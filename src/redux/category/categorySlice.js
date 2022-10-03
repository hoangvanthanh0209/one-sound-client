import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoryService from './categoryService'

const initialState = {
    categories: [],
    currentCategory: {},
    isLoadingCategory: false,
    isSuccessCategory: false,
    isErrorCategory: false,
    successMessageCategory: '',
    errorMessageCategory: '',
    listErrorMessageCategory: [],
}

export const getCategories = createAsyncThunk('category/fetch', async (_, thunkAPI) => {
    try {
        return await categoryService.getCategories()
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        resetCategory: (state) => {
            state.isLoadingCategory = false
            state.isSuccessCategory = false
            state.isErrorCategory = false
            state.successMessageCategory = ''
            state.errorMessageCategory = ''
            state.listErrorMessageCategory = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoadingCategory = true
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoadingCategory = false
                state.isSuccessCategory = true
                state.categories = action.payload
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoadingCategory = true
                state.isErrorCategory = false
                state.errorMessageCategory = action.payload
            })
    },
})

export const { resetCategory } = categorySlice.actions

export default categorySlice.reducer
