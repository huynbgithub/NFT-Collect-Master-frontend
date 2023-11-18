import Web3, { HttpProvider, WebSocketProvider } from "web3"
import { KLAYTN_TESTNET_HTTP_RPC_URL } from "../config"

export const getHttpWeb3 = (
    controller?: AbortController
) : Web3 => {
    const providerOptions = controller
        ? {
            providerOptions: {
                signal: controller.signal
            }
        } : undefined
    
    const provider = new HttpProvider(KLAYTN_TESTNET_HTTP_RPC_URL, providerOptions)
    return new Web3(provider)
}