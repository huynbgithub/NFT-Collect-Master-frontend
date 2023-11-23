import React, { ChangeEvent, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { RootState } from "@redux";
import { NFTContract } from "@blockchain";
import { Address } from "web3";
import { useSelector } from "react-redux";
import { calculateIRedenomination } from "../../../utils/math";

interface SellModalProps{
    address: Address,
    id: bigint
}

export default function SellModal(props: SellModalProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const web3 = useSelector((state: RootState) => state.blockchain.web3);
  const account = useSelector((state: RootState) => state.blockchain.account);
  
    const [tokenPrice, setTokenPrice] = useState(0)

  return (
    <>
      <Button onPress={onOpen} color="warning">Sell</Button>
      <Modal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
        <ModalBody className="p-5">
        <Input label="Price" classNames={{
            input: "text-center",
            label: "text-center w-full"
        }} variant="underlined" placeholder="Enter price" value={tokenPrice.toString()} onChange={(event: ChangeEvent<HTMLInputElement>) => setTokenPrice(Number(event.target.value))}/>
        <Button color="warning" onPress={
                                    async () => {
                                        if (web3 == null) return 
                                        const nftContract = new NFTContract(web3, account)
                                        const receipt = await nftContract.putTokenOnSale(props.address, props.id, calculateIRedenomination(tokenPrice, 18))
                                        console.log(receipt)
                                    }
                                }> Submit </Button>
        </ModalBody>
      </ModalContent>
      </Modal>
    </>
  );
}
