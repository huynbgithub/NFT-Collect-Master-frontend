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

    async isOwner(contractAddress: Address){
        try{
            const web3 = getHttpWeb3()
            const contract = getContract(web3, contractAddress)
            if (this.sender == null) return null
            return contract.methods.isOwner(this.sender).call()
        } catch(ex){
            console.log(ex)
            return null
        }
    }    

    async getOnGoingState(contractAddress: Address){
        try{
            const web3 = getHttpWeb3()
            const contract = getContract(web3, contractAddress)
            return contract.methods.getOnGoingState().call()
        } catch(ex){
            console.log(ex)
            return null
        }
    }

    async getWinner(contractAddress: Address){
        try{
            const web3 = getHttpWeb3()
            const contract = getContract(web3, contractAddress)
            return contract.methods.getWinner().call() 
        } catch(ex){
            console.log(ex)
            return null
        }
    }

    async getOwner(contractAddress: Address){
        try{
            const web3 = getHttpWeb3()
            const contract = getContract(web3, contractAddress)
            return contract.methods.getOwner().call()
        } catch(ex){
            console.log(ex)
            return null
        }
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
                rewardPrice: bigint;
                mintPrice: bigint;
            }>
        } catch(ex){
            console.log(ex)
            return null
        }
    }

    async getYourTokens(contractAddress: Address) : Promise<OwnToken[] | null>{
        try{
            const web3 = getHttpWeb3()
            const contract = getContract(web3, contractAddress)
            if (this.sender == null) return null
            const _res = await contract.methods.getYourTokens(this.sender).call()
            return _res.map(each => {
                return {
                    tokenId: BigInt(each.id),
                    image: each.image,
                    onSale: each.onSale,
                    tokenPrice: BigInt(each.tokenPrice)
                }
            })
        } catch(ex){
            console.log(ex)
            return null
        }
    }

    async getTokensOnSale(contractAddress: Address) : Promise<OwnToken[] | null>{
        try{
            const web3 = getHttpWeb3()
            const contract = getContract(web3, contractAddress)
            if (this.sender == null) return null
            const _res = await contract.methods.getTokensOnSale(this.sender).call()
            return _res.map(each => {
                return {
                    tokenId: BigInt(each.id),
                    image: each.image,
                    onSale: each.onSale,
                    tokenPrice: BigInt(each.tokenPrice)
                }
            })
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
            const value = await contract.methods.mintPrice().call() as  bigint
            return await this.web3.eth.sendTransaction({
                from: this.sender,
                to: contractAddress,
                data,
                value,
                gasLimit: GAS_LIMIT,
                gasPrice: GAS_PRICE,
            })
        } catch(ex){
            console.log(ex)
            return null
        }
    }

    async purchaseToken(tokenId: bigint, price: bigint, contractAddress: Address){
        try{
            if (this.web3 == null) return 
            if (this.sender == null) return
            const contract = getContract(this.web3, contractAddress)
            const value = price;
            const data = contract.methods.purchaseToken(tokenId).encodeABI()
            return await this.web3.eth.sendTransaction({
                from: this.sender,
                to: contractAddress,
                data,
                value,
                gasLimit: GAS_LIMIT,
                gasPrice: GAS_PRICE,
            })
        } catch(ex){
            console.log(ex)
            return null
        }
    }


    async putTokenOnSale(contractAddress: Address, tokenId: bigint, price: bigint){
        try{
            if (this.web3 == null) return 
            if (this.sender == null) return
            const contract = getContract(this.web3, contractAddress)
            const data = contract.methods.putTokenOnSale(tokenId, price).encodeABI()
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

    async unSell(contractAddress: Address, tokenId: bigint){
        try{
            if (this.web3 == null) return 
            if (this.sender == null) return
            const contract = getContract(this.web3, contractAddress)
            const data = contract.methods.unSell(tokenId).encodeABI()
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

    async mintCMTDemo(contractAddress: Address){
        try{
            if (this.web3 == null) return 
            if (this.sender == null) return
            const contract = getContract(this.web3, contractAddress)
            const data = contract.methods.mintCMTDemo().encodeABI()
            const value = await contract.methods.mintPrice().call() as  bigint
            return await this.web3.eth.sendTransaction({
                from: this.sender,
                to: contractAddress,
                data,
                value,
                gasLimit: GAS_LIMIT,
                gasPrice: GAS_PRICE,
            })
        } catch(ex){
            console.log(ex)
            return null
        }
    }

    async claimRewards(contractAddress: Address){
        try{
            if (this.web3 == null) return 
            if (this.sender == null) return
            const contract = getContract(this.web3, contractAddress)
            const data = contract.methods.claimReward().encodeABI()
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

export interface OwnToken {
    tokenId: bigint,
    position?: bigint,
    image: string,
    onSale: boolean,
    tokenPrice: bigint,
    address?: Address
}
