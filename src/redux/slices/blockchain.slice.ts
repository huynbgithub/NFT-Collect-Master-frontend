import { createSlice } from "@reduxjs/toolkit"
import Web3 from "web3"

export interface BlockchainSlice {
  web3: Web3 | null;
  account: string;
}

const initialState: BlockchainSlice = {
    web3: null,
    account: ""
}

export const blockchainSlice = createSlice({
    name: "blockchain",
    initialState,
    reducers: {
        setWeb3(state, action) {
            state.web3 = action.payload
        },
        setAccount(state, action) {
            state.account = action.payload
        }
    },
})

export const { setWeb3, setAccount } = blockchainSlice.actions

export const blockchainReducer = blockchainSlice.reducer