"use client"
import { Card, CardBody, CardFooter, CardHeader, Link, Image, Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { FactoryContract } from "../../blockchain/contracts"
import { useRouter } from "next/navigation"

export default function Page() {

  const router = useRouter()

  const contract = new FactoryContract()

  const [games, setGames] = useState<any[] | null>(null);

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
        <div className="text-lg font-bold">GAME LIST</div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-4 gap-4">
          {games && games.map((game) => (
            <Card
              isFooterBlurred
              radius="lg"
              className="border-none"
            >
              <Image
                alt="Woman listing to music"
                className="object-cover"
                height={300}
                src={game.image}
                width="100%"
              />
              <CardFooter className="justify-between  border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white">{game.name}</p>
                <Button className="text-tiny bg-orange-600" variant="flat" color="default" radius="lg" size="sm">
                  <Link color="foreground" className="cursor-pointer" onPress={() => router.push(`/game/${game.bigPictureAddress}`)}>
                    Detail
                  </Link>
                </Button>
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
