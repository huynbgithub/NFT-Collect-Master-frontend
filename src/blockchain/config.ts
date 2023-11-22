import Web3, { Address } from "web3"

export const KLAYTN_TESTNET_CHAIN_ID = 1001
export const KLAYTN_TESTNET_HTTP_RPC_URL = "https://public-en-baobab.klaytn.net"
export const KLAYTN_TESTNET_WEBSOCKET_RPC_URL = "wss://public-en-baobab.klaytn.net/ws"
export const KLAYTN_TESTNET_CONTRACT_FACTORY =
  "0x8CA806ef00459515A216f642D1f9eDFF9ac624DB"
  export const KLAYTN_TESTNET_EXPLORER = "https://baobab.klaytnscope.com/"

export const TIME_OUT = 1000


export const GAS_PRICE = Web3.utils.toWei(55, "gwei")
export const GAS_LIMIT = 5000000

