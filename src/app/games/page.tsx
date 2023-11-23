"use client"
import { Card, CardBody, CardFooter, CardHeader, Link, Image, Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { FactoryContract } from "../../blockchain/contracts"
import { usePathname, useRouter } from "next/navigation"
import { NFT } from "../../blockchain/contracts/factory";
import { calculateRedenomination } from "../../utils/math";
import { getIpfsImageBlobUrl } from "../../api/next";
import { Address } from "web3";

export default function Page() {
  const path = usePathname()
  const router = useRouter()

  const contract = new FactoryContract()

  const [games, setGames] = useState<RenderNFT[]>([]);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    const _gamesData = await contract.getAll()
    if (_gamesData == null) return 

    console.log(_gamesData)
    const _games : RenderNFT[] = []
    const promises : Promise<void>[] = []
    for (const data of _gamesData){
      const promise = getIpfsImageBlobUrl(data.image).then(
        url => {
          console.log(url)
          if (url == null) return
          _games.push({
          imgUrl: url,
          mintPrice: calculateRedenomination(data.mintPrice, 18, 3),
          reward: calculateRedenomination(data.rewardPrice, 18, 3),
          name: data.name,
          address: data.bigPictureAddress
          }
        )
        }
      )
      promises.push(promise)
    }
    await Promise.all(promises)
    setGames(_games)
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
                   alt={game.imgUrl}
                   className="w-full object-cover h-[200px]"
                   src={game.imgUrl}
                   onClick={() => router.push(`${path}/${game.address}`)}
                 />
               </CardBody>
               <CardFooter className="text-small justify-between">
                 <b>{game.name}</b>
                 <p className="text-default-500">{game.reward}</p>
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

export interface RenderNFT{
  name: string,
  imgUrl: string,
  mintPrice: number,
  reward: number,
  address: Address
}