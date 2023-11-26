"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { FactoryContract } from "../../blockchain/contracts";
import { usePathname, useRouter } from "next/navigation";
import { calculateRedenomination } from "../../utils/math";
import { getIpfsImageBlobUrl } from "../../api/next";
import { Address } from "web3";

export default function Page() {
  const path = usePathname();
  const router = useRouter();

  const contract = new FactoryContract();

  const [games, setGames] = useState<RenderNFT[]>([]);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    const _gamesData = await contract.getAll();
    if (_gamesData == null) return;

    const _games: RenderNFT[] = [];
    const promises: Promise<void>[] = [];
    for (const data of _gamesData) {
      const promise = getIpfsImageBlobUrl(data.image).then((url) => {
        if (url == null) return;
        _games.push({
          imgUrl: url,
          mintPrice: calculateRedenomination(data.mintPrice, 18, 3),
          reward: calculateRedenomination(data.rewardPrice, 18, 3),
          name: data.name,
          address: data.bigPictureAddress,
        });
      });
      promises.push(promise);
    }
    await Promise.all(promises);
    setGames(_games);
  }

  return (
    <Card>
      <CardHeader className="p-5">
        <div className="text-4xl font-bold text-teal-500">Games</div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-4 gap-6">
          {games.map((game, key) => (
            <Card
              shadow="sm"
              key={key}
              isPressable
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={game.imgUrl}
                  className="w-full object-cover h-[200px]"
                  src={game.imgUrl}
                  onClick={() => router.push(`${path}/${game.address}`)}
                />
              </CardBody>
              <CardFooter>
                <div>
                  <div className="text-xl text-left font-bold">{game.name}</div>
                  <div>
                    <div className="flex gap-2 items-center mt-4">
                      <div className="text-teal-500 font-bold">Mint Price</div>
                      <div>
                        {game.mintPrice} KLAY
                      </div>
                    </div>
                    <div className="flex gap-2 items-center mt-2">
                      <div className="text-teal-500 font-bold">Reward</div>
                      <div>
                        {game.reward} KLAY
                      </div>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardBody>
      <CardFooter className="p-5 gap-4"></CardFooter>
    </Card>
  );
}

export interface RenderNFT {
  name: string;
  imgUrl: string;
  mintPrice: number;
  reward: number;
  address: Address;
}
