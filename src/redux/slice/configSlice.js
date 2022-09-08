import { createSlice } from '@reduxjs/toolkit'
import { Fragment } from 'react'

const ranInt = () => {
    return Math.floor(Math.random() * 256)
}

const ranColor = () => {
    const r = ranInt()
    const g = ranInt()
    const b = ranInt()
    return `rgb(${r},${g},${b})`
}

const initialState = {
    color: 'rgb(0, 0, 0)',
    modal: {
        isShow: false,
        title: '',
        form: Fragment,
    },
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        randomColor: (state) => {
            state.color = ranColor()
        },
        resetColor: (state) => {
            state.color = initialState.color
        },
        showModal: (state, action) => {
            state.modal.isShow = true
            state.modal.title = action.payload.title
            state.modal.form = action.payload.form
        },
        hiddenModal: (state) => {
            state.modal = initialState.modal
        },
    },
})

export const { randomColor, resetColor, showModal, hiddenModal } = configSlice.actions

export default configSlice
