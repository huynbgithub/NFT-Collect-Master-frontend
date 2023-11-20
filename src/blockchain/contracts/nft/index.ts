import {
    GAS_LIMIT,
    GAS_PRICE,
} from "../../config"
import { getHttpWeb3 } from "../provider"

import Web3, { Address } from "web3"
import abi from "./abi"

const getContract = (web3: Web3, contractAddress: Address) => {
    return new web3.eth.Contract(abi,contractAddress, web3)
}

class NFTContract {
    private web3?: Web3
    private sender?: Address

    constructor(web3?: Web3, sender?: Address) {
        this.sender = sender
        this.web3 = web3
    }

    async getSingle(contractAddress: Address){
        try{
            const web3 = getHttpWeb3()
            const contract = getContract(web3, contractAddress)
            return contract.methods.getSingleBigPicture().call() as Promise<{
                address: string;
                name: string;
                image: string;
                picturePieces: string[];
                rewardPrice: number;
            }>
        } catch(ex){
            console.log(ex)
            return null
        }
    }

    async getYourTokens(contractAddress: Address){
        try{
            const web3 = getHttpWeb3()
            const contract = getContract(web3, contractAddress)
            if (this.sender == null) return
            return contract.methods.getYourTokens(this.sender).call() as Promise<[]>
        } catch(ex){
            console.log(ex)
            return null
        }
    }

    async mintCMT(contractAddress: Address){
        try{
            if (this.web3 == null) return 
            if (this.sender == null) return
            const contract = getContract(this.web3, contractAddress)
            const data = contract.methods.mintCMT().encodeABI()

            return await this.web3.eth.sendTransaction({
                from: this.sender,
                to: contractAddress,
                data,
                gasLimit: GAS_LIMIT,
                gasPrice: GAS_PRICE,
            })
        } catch(ex){
            console.log(ex)
            return null
        }
    }
}

export default NFTContract
