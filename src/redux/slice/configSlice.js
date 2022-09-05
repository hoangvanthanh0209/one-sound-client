import { createSlice } from '@reduxjs/toolkit'

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
    isShowModal: false,
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        randomColor: (state) => {
            return {
                ...state,
                color: ranColor(),
            }
        },
        resetColor: (state) => {
            return {
                ...state,
                color: initialState.color,
            }
        },
        showModal: (state) => {
            return {
                ...state,
                isShowModal: true,
            }
        },
        hiddenModal: (state) => {
            return {
                ...state,
                isShowModal: false,
            }
        },
    },
})

export const { randomColor, resetColor, showModal, hiddenModal } = configSlice.actions

export default configSlice
