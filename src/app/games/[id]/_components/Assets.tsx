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
import { useSelector } from "react-redux";
import { RootState } from "@redux";
import { OwnToken } from "../../../../blockchain/contracts/nft";
import {
  buildIpfsUrl,
  getIpfsJson,
} from "../../../../api/next";
import { ViewOnExplorer } from "../../../_shared";

interface AssetsProps {
  address: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}
export default function Assets(props: AssetsProps) {
  const web3 = useSelector((state: RootState) => state.blockchain.web3);
  const account = useSelector((state: RootState) => state.blockchain.account);
  const [tokens, setTokens] = useState<OwnToken[]>([]);
  const [onGoingState, setOnGoingState] = useState<boolean | null>(null)
  const [winner, setWinner] = useState<string | null>(null)

  useEffect(() => {
    if (account == null) return;
    const handleEffect = async () => {
      if (web3 == null) return;
      const contract = new NFTContract(web3, account);
      const tokensData = await contract.getYourTokens(props.address);
      const gameState = await contract.getOnGoingState(props.address);
      setOnGoingState(gameState);
      const winnerAddress = await contract.getWinner(props.address);
      setWinner(winnerAddress);

      if (tokensData == null) return;

      const _tokensData: OwnToken[] = [];

      const promises: Promise<void>[] = [];
      for (let i = 0; i < tokensData.length; i++) {
        const _data = tokensData[i];
        const promise = getIpfsJson(_data.image).then((_p) => {
          if (_p == null) return;
          const __p = _p as {
            index: number;
            url: string;
          };
          _tokensData.push({
            tokenId: _data.tokenId,
            position: BigInt(__p.index),
            image: __p.url,
            onSale: _data.onSale,
            tokenPrice: _data.tokenPrice,
          });
        });
        promises.push(promise);
      }
      await Promise.all(promises);

      _tokensData.sort((prep, next) => Number(prep.tokenId - next.tokenId))

      setTokens(_tokensData);
    };
    handleEffect();
  }, [account, props.count]);

  return (

    !onGoingState
      ?
      <Card className="text-4xl font-bold">
        <CardBody>
          <div className="flex flex-col items-center h-full">
            <div className=" flex flex-col items-center gap-6 justify-between h-full">
              <div className="text-4xl font-bold text-teal-500 text-center"> The Game Ended </div>
              <div className="flex flex-col items-center">
              <Image alt="trophy" className="w-40 h-40" src="/trophy.svg"/>
              <div className="flex gap-2 w-fit  mt-4">
                <div className="font-bold text-base"> Winner: </div>
                <ViewOnExplorer hexString={winner ?? ""} showShorten/>
              </div>
              </div>
              <Spacer y={0}/>
            </div>
          </div>
        </CardBody>
      </Card>
      :
      <Card>
        <CardHeader className="p-5">
          <div className="text-4xl font-bold">Your NFTs</div>
        </CardHeader>
        <CardBody>
          <div className="gap-4 flex">
            <div className="grid grid-cols-4 gap-4">
              {tokens &&
                tokens.map((token) => (
                  <Card
                    key={token.tokenId}
                    isFooterBlurred
                    radius="lg"
                    className="border-none"
                  >
                    <Image
                      alt="Woman listing to music"
                      className="object-cover"
                      height={300}
                      src={buildIpfsUrl(token.image)}
                      width="100%"
                    />
                    <CardFooter>
                      <div>
                        <div className="font-bold">#{Number(token.position)}</div>{" "}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        </CardBody>
        <CardFooter className="p-5 gap-4">
          {" "}
          <Button
            isDisabled={!isContainsAll(tokens)}
            className="bg-teal-500 text-base text-white w-full"
            onPress={async () => {
              if (web3 == null) return;
              if (account == null) return;
              const address = props.address;
              const contract = new NFTContract(web3, account);
              const receipt = await contract.claimRewards(address);
              console.log(receipt);

              props.setCount(props.count + 1);
            }}
          >
            {" "}
            Claim Prize{" "}
          </Button>
        </CardFooter>
      </Card>
  );
}

const isContainsAll = (tokens: OwnToken[]) => {
  const _t = tokens.map((token) => Number(token.position));
  for (let i = 0; i < 9; i++) {
    if (!_t.includes(i)) {
      return false;
    }
  }
  return true;
};
