import Web3, { Address } from "web3"

const KLAYTN_TESTNET_CHAIN_ID = 1001
const KLAYTN_TESTNET_HTTP_RPC_URL = "https://api.baobab.klaytn.net:8651"
const KLAYTN_TESTNET_WEBSOCKET_RPC_URL = "wss://public-en-baobab.klaytn.net/ws"
const KLAYTN_TESTNET_CONTRACT_FACTORY =
  "0xE2CBDabd584bF18b46c3A42790Eaf3E722003258"
const KLAYTN_TESTNET_EXPLORER = "https://baobab.klaytnscope.com/"

export const TIME_OUT = 1000

export enum ChainName {
  KlaytnTestnet,
}

export type ChainInfo = {
  chainId: number;
  httpRpcUrl: string;
  websocketRpcUrl: string;
  factoryAddress: Address;
  explorerUrl: string;
};

export const chainInfos: Record<number, ChainInfo> = {
    [ChainName.KlaytnTestnet]: {
        chainId: KLAYTN_TESTNET_CHAIN_ID,
        httpRpcUrl: KLAYTN_TESTNET_HTTP_RPC_URL,
        websocketRpcUrl: KLAYTN_TESTNET_WEBSOCKET_RPC_URL,
        factoryAddress: KLAYTN_TESTNET_CONTRACT_FACTORY,
        explorerUrl: KLAYTN_TESTNET_EXPLORER,
    },
}

export const GAS_PRICE = Web3.utils.toWei(25, "gwei")
export const GAS_LIMIT = 3000000

