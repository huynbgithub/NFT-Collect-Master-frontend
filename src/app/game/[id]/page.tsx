"use client"
import { Input, Button, Spacer, Card, CardBody, CardFooter, CardHeader, Link, Image } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { NFTContract } from "../../../blockchain/contracts"
import { useParams } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@redux"

export default function Page() {

    const web3 = useSelector((state: RootState) => state.blockchain.web3)
    const account = useSelector((state: RootState) => state.blockchain.account)

    const params = useParams()

    const address = params.id as string

    const contract = new NFTContract()

    const [game, setGame] = useState<{
        address: string;
        name: string;
        image: string;
        picturePieces: string[];
        rewardPrice: number;
    } | null>(null);

    const [tokens, setTokens] = useState<[] | null | undefined>(null);

    useEffect(() => {
        loadGame();
        loadYourTokens();
    }, [account]);

    async function loadGame() {
        const gameData = await contract.getSingle(address)
        setGame(gameData);
    }

    async function loadYourTokens() {
        const tokensData = await contract.getYourTokens(address)
        setTokens(tokensData);
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
                            <Button type="submit" color="warning"
                                onClick={async () => {
                                    if (web3 == null) return
                                    if (account == null) return
                                    if (game?.address == null) return
                                    const contract = new NFTContract(web3, account)
                                    const receipt = await contract.mintCMT(game?.address)
                                }

                                }> Mint CMT Token </Button>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {tokens && tokens.map((token) => (
                                <Card
                                    isFooterBlurred
                                    radius="lg"
                                    className="border-none"
                                >
                                    <Image
                                        alt="Woman listing to music"
                                        className="object-cover"
                                        height={300}
                                        src={token.image}
                                        width="100%"
                                    />
                                    <CardFooter className="justify-between  border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                        <p className="text-tiny text-white">{token.id}</p>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="p-5 gap-4">
            </CardFooter>
        </Card>
    )
}
