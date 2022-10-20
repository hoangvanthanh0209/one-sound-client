import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import authSlice from './auth/authSlice'
import configSlice from './config/configSlice'
import musicSlice from './music/musicSlice'
import categorySlice from './category/categorySlice'
import currentSlice from './current/currentSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'current', 'music'],
}

const reducer = combineReducers({
    config: configSlice,
    auth: authSlice,
    music: musicSlice,
    category: categorySlice,
    current: currentSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)

export default store
