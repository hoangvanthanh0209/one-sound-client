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
    isShowList: false,
    modal: {
        isShow: false,
        title: '',
        form: '',
        data: {},
    },
    modalConfirm: {
        isShow: false,
        id: '',
        action: '',
        model: '',
    },
}

export const configSlice = createSlice({
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
        showModalConfirm: (state, action) => {
            state.modalConfirm.isShow = true
            state.modalConfirm.id = action.payload.id
            state.modalConfirm.model = action.payload.model
        },
        setDataForm: (state, action) => {
            state.modal.data = action.payload
        },
        clearDataForm: (state) => {
            state.modal.data = {}
        },
        hiddenModal: (state) => {
            state.modal = initialState.modal
        },
        hiddenModalConfirm: (state) => {
            state.modalConfirm = initialState.modalConfirm
        },
        setShowList: (state) => {
            state.isShowList = true
        },
        hiddenShowList: (state) => {
            state.isShowList = false
        },
    },
})

export const {
    randomColor,
    resetColor,
    showModal,
    hiddenModal,
    setDataForm,
    clearDataForm,
    showModalConfirm,
    hiddenModalConfirm,
    setShowList,
    hiddenShowList,
} = configSlice.actions

export default configSlice.reducer
