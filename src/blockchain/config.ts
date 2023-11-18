import Web3, { Address } from "web3"

export const KLAYTN_TESTNET_CHAIN_ID = 1001
export const KLAYTN_TESTNET_HTTP_RPC_URL = "https://api.baobab.klaytn.net:8651"
export const KLAYTN_TESTNET_WEBSOCKET_RPC_URL = "wss://public-en-baobab.klaytn.net/ws"
export const KLAYTN_TESTNET_CONTRACT_FACTORY =
  "0xE2CBDabd584bF18b46c3A42790Eaf3E722003258"
  export const KLAYTN_TESTNET_EXPLORER = "https://baobab.klaytnscope.com/"

export const TIME_OUT = 1000



export const GAS_PRICE = Web3.utils.toWei(25, "gwei")
export const GAS_LIMIT = 3000000

