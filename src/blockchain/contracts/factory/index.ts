import {
    GAS_LIMIT,
    GAS_PRICE,
    KLAYTN_TESTNET_CONTRACT_FACTORY
} from "../../config"
import { getHttpWeb3 } from "../provider"

import Web3, { Address } from "web3"
import abi from "./abi"

const getFactoryContract = (web3: Web3) => {
    const factoryAddress = KLAYTN_TESTNET_CONTRACT_FACTORY
    return new web3.eth.Contract(abi, factoryAddress, web3)
}

class FactoryContract {
    private factoryAddress: Address
    private web3?: Web3
    private sender?: Address

    constructor(web3?: Web3, sender?: Address) {
        this.factoryAddress = KLAYTN_TESTNET_CONTRACT_FACTORY
        this.sender = sender
        this.web3 = web3
    }

    async getAll() : Promise<NFT[] | null>{
        try{
            const web3 = getHttpWeb3()
            const contract = getFactoryContract(web3)
            return await contract.methods.getAllBigPictureDatas().call()
        } catch(ex){
            console.log(ex)
            return null
        }
    }

    async createBigPicture(name: string, bigImageUrl: string, cutImageUrls: string[], mintPrice: bigint, reward: bigint){
        try{
            if (this.web3 == null) return 
            if (this.sender == null) return
            const contract = getFactoryContract(this.web3)

            const data = contract.methods
                .createBigPicture(name, bigImageUrl, cutImageUrls, reward, mintPrice)
                .encodeABI()

            return await this.web3.eth.sendTransaction({
                from: this.sender,
                to: this.factoryAddress,
                data,
                value: reward,
                gasLimit: GAS_LIMIT,
                gasPrice: GAS_PRICE,
            })
        } catch(ex){
            console.log(ex)
            return null
        }
    }
}

export default FactoryContract

export interface NFT {
        bigPictureAddress: string;
        name: string;
        image: string;
        picturePieces: string[];
        mintPrice: bigint;
        rewardPrice: bigint;
}
