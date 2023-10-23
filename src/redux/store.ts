import { configureStore } from "@reduxjs/toolkit"
import { blockchainReducer, blockchainSlice } from "./slices"

export const store = configureStore({
    reducer: {
        [blockchainSlice.name]: blockchainReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch