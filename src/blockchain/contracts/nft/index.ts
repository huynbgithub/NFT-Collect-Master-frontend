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
}

export default NFTContract
