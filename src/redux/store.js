import { configureStore } from '@reduxjs/toolkit'
import configSlice from './slice/configSlice'

const store = configureStore({
    reducer: {
        config: configSlice.reducer,
    },
})

export default store
