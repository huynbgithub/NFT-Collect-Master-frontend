"use client";
import {
  Input,
  Button,
  Spacer,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Image,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { NFTContract } from "../../../../blockchain/contracts";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@redux";
import { OwnToken } from "../../../../blockchain/contracts/nft";
import { buildIpfsUrl, getIpfsImageBlobUrl, getIpfsJson } from "../../../../api/next";
import { Address } from "web3";

interface AllProps{
    address: Address
}
export default function All(props: AllProps) {
  const web3 = useSelector((state: RootState) => state.blockchain.web3);
  const account = useSelector((state: RootState) => state.blockchain.account);

  const [game, setGame] = useState<SingleItem | null>(null);

  useEffect(() => {
    const handleEffect = async () => {
      const contract = new NFTContract();
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
        rewardPrice: gameData.rewardPrice,
        picturePieces: pieces,
      };
      setGame(_game);
    };
    handleEffect();
  }, []);

  return (
    <Card  className="col-span-1">
      <CardHeader className="p-5">
        <div className="text-lg font-bold">{game?.name}</div>
      </CardHeader>
      <CardBody>
            <div className="grid grid-cols-3 gap-3 justify-center justify-items-center">
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
            <CardFooter className="p-0 mt-4 gap-4">
            <Button
              className="w-full"
              type="submit"
              variant="bordered"
              color="warning"
              onClick={async () => {
                if (web3 == null) return;
                if (account == null) return;
                const address = props.address
                console.log(address);
                if (address == null) return;
                const contract = new NFTContract(web3, account);
                const receipt = await contract.mintCMT(address);
                console.log(receipt);
              }}
            >
              {" "}
              Mint{" "}
            </Button>
            <Button
              className="w-full"
              type="submit"
              color="warning"
              onClick={async () => {
                if (web3 == null) return;
                if (account == null) return;
                const address = props.address
                console.log(address);
                if (address == null) return;
                const contract = new NFTContract(web3, account);
                const receipt = await contract.mintCMTDemo(address);
                console.log(receipt);
              }}
            >
              {" "}
              Mint All{" "}
            </Button>
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
  rewardPrice: number;
}
