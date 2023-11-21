"use client"
import { Card, CardBody, CardFooter, CardHeader, Link, Image, Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { FactoryContract } from "../../blockchain/contracts"
import { usePathname, useRouter } from "next/navigation"
import { NFT } from "../../blockchain/contracts/factory";
import { calculateRedenomination } from "../../utils/math";

export default function Page() {
  const path = usePathname()
  const router = useRouter()

  const contract = new FactoryContract()

  const [games, setGames] = useState<NFT[] | null>(null);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    const gamesData = await contract.getAll()
    console.log(gamesData)
    setGames(gamesData);
  }

  return (
    <Card>
      <CardHeader className="p-5">
        <div className="text-lg font-bold">GAME</div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-4 gap-4">
          {games && games.map((game, key) => (
               <Card shadow="sm" key={key} isPressable onPress={() => console.log("item pressed")}>
               <CardBody className="overflow-visible p-0">
                 <Image
                   shadow="sm"
                   radius="lg"
                   width="100%"
                   alt={game.image}
                   className="w-full object-cover h-[200px]"
                   src={game.image}
                   onClick={() => router.push(`${path}/${game.bigPictureAddress}`)}
                 />
               </CardBody>
               <CardFooter className="text-small justify-between">
                 <b>{game.name}</b>
                 <p className="text-default-500">{calculateRedenomination(game.rewardPrice, 18, 3)}</p>
               </CardFooter>
             </Card>
          ))}
        </div>
      </CardBody>
      <CardFooter className="p-5 gap-4">
      </CardFooter>
    </Card>
  )
}
