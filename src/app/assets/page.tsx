"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Button,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { FactoryContract, NFTContract } from "../../blockchain/contracts";
import { calculateRedenomination } from "../../utils/math";
import { buildIpfsUrl, getIpfsJson } from "../../api/next";
import { Address } from "web3";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { OwnToken } from "../../blockchain/contracts/nft";
import SellModal from "./_components/SellModal";

export default function Page() {
  const web3 = useSelector((state: RootState) => state.blockchain.web3);
  const account = useSelector((state: RootState) => state.blockchain.account);

  const contract = new FactoryContract();

  const [ownNFTs, setOwnNFTs] = useState<RenderOwnNFT[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    loadNFTs();
  }, [account, count]);

  async function loadNFTs() {
    const _gamesData = await contract.getAll();
    if (_gamesData == null) return;
    if (web3 == null) return;
    if (account == null) return;

    const _ownedNFTs: RenderOwnNFT[] = [];
    const promises: Promise<void>[] = [];
    for (const data of _gamesData) {
      const nftContract = new NFTContract(web3, account);
      const promise = nftContract
        .getYourTokens(data.bigPictureAddress)
        .then(async (tokens) => {
          if (tokens == null) return;

          const _ownedTokens: OwnToken[] = [];
          const _promises: Promise<void>[] = [];
          for (const token of tokens) {
            const _promise = getIpfsJson(token.image).then((_p) => {
              if (_p == null) return;
              const __p = _p as {
                index: number;
                url: string;
              };

              _ownedTokens.push({
                tokenId: token.tokenId,
                position: BigInt(__p.index),
                image: __p.url,
                onSale: token.onSale,
                tokenPrice: token.tokenPrice,
                address: data.bigPictureAddress
              }
              );
            })
            _promises.push(_promise);
          }
          await Promise.all(_promises);

          _ownedNFTs.push(
            {
              nftAddress: data.bigPictureAddress,
              nftName: data.name,
              tokens: _ownedTokens
            }
          )
        });
      promises.push(promise);
    }
    await Promise.all(promises);
    setOwnNFTs(_ownedNFTs);
  }

  return (
    <Card>
      <CardHeader className=" p-5">
        <div className="text-4xl font-bold text-teal-500">
          Your NFTs
        </div>
      </CardHeader>
      <CardBody>
        {ownNFTs.map((nft) => (
          <div key={nft.nftAddress} className="mb-10">
            <div className="text-2xl font-bold text-orange-500 flex items-center gap-4"> {nft.nftName} </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {nft.tokens.map((token) => (
                <Card key={token.tokenId} radius="lg">
                  <Image
                    alt="Woman listing to music"
                    className="object-cover"
                    height={300}
                    src={buildIpfsUrl(token.image)}
                    width="100%"
                  />
                  <CardFooter>
                    <div className="grid gap-2 w-full">
                      <div className="font-bold">#{Number(token.position)}</div>
                      <div className="flex gap-2"><div className="text-teal-500 font-bold"> Price </div> <div>{calculateRedenomination(token.tokenPrice, 18, 3)} KLAY</div></div>
                      {
                        !token.onSale ?
                          <SellModal address={token.address as string} tokenId={token.tokenId as bigint} setCount={setCount} count={count}/>
                          :
                          <Button variant="bordered" className="w-full border-teal-500 text-base text-teal-500"
                          onClick={async () => {
                            if (web3 == null) return;
                            if (account == null) return;
                            const address = token.address
                            if (address == null) return;
                            const contract = new NFTContract(web3, account);
                            const receipt = await contract.unSell(address, token.tokenId);
                            console.log(receipt);
                            setCount(count + 1);
                          }}
                          > Unsell </Button>
                      }

                    </div>

                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </CardBody>
      <CardFooter className="p-5 gap-4"></CardFooter>
    </Card>
  );
}

interface RenderOwnNFT {
  nftAddress: Address;
  nftName: string;
  tokens: OwnToken[];
}
