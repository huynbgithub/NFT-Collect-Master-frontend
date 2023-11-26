"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { NFTContract } from "../../../../blockchain/contracts";
import { useSelector } from "react-redux";
import { RootState } from "@redux";
import { buildIpfsUrl, getIpfsJson } from "../../../../api/next";
import { Address } from "web3";
import { sleep } from "../../../../utils/others";
import { calculateRedenomination } from "../../../../utils/math";

interface AllProps {
  address: Address
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
}
export default function All(props: AllProps) {
  const web3 = useSelector((state: RootState) => state.blockchain.web3);
  const account = useSelector((state: RootState) => state.blockchain.account);

  const [game, setGame] = useState<SingleItem | null>(null);
  const [isOwner, setIsOwner] = useState<boolean | null>(null)
  const [onGoingState, setOnGoingState] = useState<boolean | null>(null)

  useEffect(() => {

    const handleEffect = async () => {
      const contract = new NFTContract();

      const gameState = await contract.getOnGoingState(props.address);
      setOnGoingState(gameState);

      const gameData = await contract.getSingle(props.address);
      if (gameData == null) return;

      const pieces: { index: number; url: string }[] = [];
      const promises: Promise<void>[] = [];
      for (let i = 0; i < gameData.picturePieces.length; i++) {
        const _piece = gameData.picturePieces[i];
        const promise = getIpfsJson(_piece).then((_p) => {
          if (_p == null) return;
          const __p = _p as {
            index: number,
            url: string
          }
          pieces.push({
            index: __p.index,
            url: __p.url,
          });
        });
        promises.push(promise);
      }
      await Promise.all(promises);

      pieces.sort((prev, next) => prev.index - next.index);

      const _game: SingleItem = {
        address: gameData.address,
        image: gameData.image,
        name: gameData.name,
        mintPrice: calculateRedenomination(gameData.mintPrice, 18, 3),
        rewardPrice: calculateRedenomination(gameData.rewardPrice, 18, 3),
        picturePieces: pieces,
      };
      setGame(_game);

      const isOwner = await contract.isOwner(props.address);
      setIsOwner(isOwner);
    };
    handleEffect();
  }, [account, props.count]);

  return (
    <Card className="col-span-1">
      <CardHeader className="p-5">
        <div className="text-4xl font-bold">{game?.name}</div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-3 gap-4 justify-center justify-items-center">
          {game?.picturePieces.map((image, index) => (
            <Image
              isZoomed
              radius="sm"
              className="w-full h-full"
              key={index}
              src={buildIpfsUrl(image.url)}
              alt="cutImage"
            />
          ))}
        </div>
        <CardFooter className="pt-12 px-0 gap-4">
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 ml-10">
              <div className="flex gap-2 items-center">
                <div className="text-teal-500 font-bold">Mint Price</div>
                <div>
                  {game?.mintPrice} KLAY
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-teal-500 font-bold">Reward</div>
                <div>
                  {game?.rewardPrice} KLAY
                </div>
              </div>
            </div>
            {onGoingState &&
              (isOwner
                ?
                <div className="w-full border-teal-500 text-teal-500 text-base">Game creators cannot play!</div>
                :
                <>
                  <Button
                    className="w-full border-teal-500 text-teal-500 text-base"
                    type="submit"

                    variant="bordered"
                    onClick={async () => {
                      if (web3 == null) return;
                      if (account == null) return;
                      const address = props.address
                      if (address == null) return;
                      const contract = new NFTContract(web3, account);
                      const receipt = await contract.mintCMT(address);
                      console.log(receipt);
                      await sleep(5000);
                      props.setCount(props.count + 1);
                    }}
                  >
                    {" "}
                    Mint{" "}
                  </Button>
                  <Button
                    className="w-full bg-teal-500 text-white text-base"
                    type="submit"
                    color="warning"
                    onClick={async () => {
                      if (web3 == null) return;
                      if (account == null) return;
                      const address = props.address
                      if (address == null) return;
                      const contract = new NFTContract(web3, account);
                      const receipt = await contract.mintCMTDemo(address);
                      console.log(receipt);
                      props.setCount(props.count + 1);
                    }}
                  >
                    {" "}
                    Mint All For Demo{" "}
                  </Button>
                </>
              )}
          </div>
        </CardFooter>
      </CardBody>
    </Card>
  );
}

interface SingleItem {
  address: string;
  name: string;
  image: string;
  picturePieces: { index: number; url: string }[];
  mintPrice: number;
  rewardPrice: number;
}
