import React, { ChangeEvent, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input } from "@nextui-org/react";
import { RootState } from "@redux";
import { NFTContract } from "@blockchain";
import { Address } from "web3";
import { useSelector } from "react-redux";
import { calculateIRedenomination } from "../../../utils/math";

interface SellModalProps {
  address: Address,
  tokenId: bigint,
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>
}

export default function SellModal(props: SellModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const web3 = useSelector((state: RootState) => state.blockchain.web3);
  const account = useSelector((state: RootState) => state.blockchain.account);

  const [tokenPrice, setTokenPrice] = useState(0)

  return (
    <>
      <Button onPress={onOpen} className="bg-teal-500 text-white text-base">Sell</Button>
      <Modal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="text-4xl font-bold p-5"> Enter Price </ModalHeader>
          <ModalBody className="p-5">
            <Input endContent={<div className="text-gray-500"> KLAY</div>} variant="underlined" value={tokenPrice.toString()} onChange={(event: ChangeEvent<HTMLInputElement>) => setTokenPrice(Number(event.target.value))} />
            <Button className="bg-teal-500 text-base text-white" onPress={
              async () => {
                if (web3 == null) return
                const nftContract = new NFTContract(web3, account)
                const receipt = await nftContract.putTokenOnSale(props.address, props.tokenId, calculateIRedenomination(tokenPrice, 18))
                console.log(receipt)
                props.setCount(props.count + 1)
              }
            }> Submit </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
