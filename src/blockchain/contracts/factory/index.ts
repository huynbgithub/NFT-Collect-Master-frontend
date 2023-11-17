import {
    GAS_LIMIT,
    GAS_PRICE,
    chainInfos,
} from "../../config"
import { ChainName } from "../../config"
import { getHttpWeb3 } from "../provider"

import Web3, { Address } from "web3"
import abi from "./abi"

const getFactoryContract = (web3: Web3) => {
    const factoryAddress = chainInfos[ChainName.KlaytnTestnet].factoryAddress
    return new web3.eth.Contract(abi, factoryAddress, web3)
}

class FactoryContract {
    private chainName: ChainName
    private factoryAddress: Address
    private web3?: Web3
    private sender?: Address

    constructor(chainName: ChainName, web3?: Web3, sender?: Address) {
        this.chainName = chainName
        this.factoryAddress = chainInfos[this.chainName].factoryAddress
        this.sender = sender
        this.web3 = web3
    }

    async getAll(){
        try{
            const web3 = getHttpWeb3(this.chainName)
            const contract = getFactoryContract(web3)
            return contract.methods.getAllBigPictures().call()
        } catch(ex){
            console.log(ex)
            return null
        }
    }
}

export default FactoryContract
