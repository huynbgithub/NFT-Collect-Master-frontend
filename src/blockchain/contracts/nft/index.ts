import {
    GAS_LIMIT,
    GAS_PRICE,
    chainInfos,
} from "../../config"
import { ChainName } from "../../config"
import { getHttpWeb3 } from "../provider"

import Web3, { Address } from "web3"
import abi from "./abi"

const getContract = (web3: Web3, contractAddress: Address) => {
    return new web3.eth.Contract(abi,contractAddress, web3)
}

class NFTContract {
    private chainName: ChainName
    private contractAddress: Address
    private web3?: Web3
    private sender?: Address

    constructor(chainName: ChainName, web3?: Web3, sender?: Address) {
        this.chainName = chainName
        this.contractAddress = chainInfos[this.chainName].factoryAddress
        this.sender = sender
        this.web3 = web3
    }

    async getSingle(contractAddress: Address){
        try{
            const web3 = getHttpWeb3(this.chainName)
            const contract = getContract(web3, contractAddress)
            return contract.methods.getAllBigPictures().call()
        } catch(ex){
            console.log(ex)
            return null
        }
    }
}

export default NFTContract
