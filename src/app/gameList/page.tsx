"use client"
import { Card, CardBody, CardFooter, CardHeader, Link } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { FactoryContract } from "../../blockchain/contracts"

export default function Page() {
  const contract = new FactoryContract()

  const [games, setGames] = useState<[] | null>(null);

  useEffect(() => {
    loadGames();
  }, [games]);

  async function loadGames() {
    const gamesData = await contract.getAll()
    setGames(gamesData);
  }

  return (
    <Card>
      <CardHeader className="p-5">
        <div className="text-lg font-bold">GAME LIST</div>
      </CardHeader>
      <CardBody>
        {games && games.map((game) => (
          <Link color="foreground" href={`/${game}`}>
            {game}
          </Link>
        ))}
      </CardBody>
      <CardFooter className="p-5 gap-4">
      </CardFooter>
    </Card>
  )
}
