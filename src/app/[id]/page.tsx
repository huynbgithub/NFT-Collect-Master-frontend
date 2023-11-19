"use client"
import { Input, Button, Spacer, Card, CardBody, CardFooter, CardHeader, Link, Image } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { NFTContract } from "../../blockchain/contracts"
import { useParams } from "next/navigation"

export default function Page() {

    const params = useParams()

    const address = params.id as string

    const contract = new NFTContract()

    const [game, setGame] = useState<{
        name: string;
        image: string;
        picturePieces: string[];
        rewardPrice: number;
    } | null>(null);

    useEffect(() => {
        loadGame();
    }, []);

    async function loadGame() {
        const gameData = await contract.getSingle(address)
        setGame(gameData);
        console.log(gameData)
    }

    return (
        <Card>
            <CardHeader className="p-5">
                <div className="text-lg font-bold">GAME DETAIL</div>
            </CardHeader>
            <CardBody>
                <div className="grid grid-cols-2 gap-6">
                    <div className="grid grid-cols-3 gap-3 justify-center justify-items-center">
                        {
                            game?.picturePieces.map((image, index) => <Image isZoomed radius="sm" className="w-full h-full" key={index} src={image} alt="cutImage" />)
                        }
                    </div>
                    <div>
                        <div className="flex flex-col gap-4">
                            <Input label="Name" title="Name" id="name" value={game?.name} />
                            {/* <Input label="Reward" title="Reward" id="reward" value={game?.rewardPrice} onChange={ }> */}
                        </div>
                        <Spacer y={4} />
                        <div className="gap-4 flex">
                            <Button type="submit" color="warning"> Mint CMT Token </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="p-5 gap-4">
            </CardFooter>
        </Card>
    )
}
