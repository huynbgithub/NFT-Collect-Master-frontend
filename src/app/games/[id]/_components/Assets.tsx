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

export default function Page() {
  const web3 = useSelector((state: RootState) => state.blockchain.web3);
  const account = useSelector((state: RootState) => state.blockchain.account);

  const params = useParams();

  const address = params.id as string;

  const [tokens, setTokens] = useState<OwnToken[] | null>(null);

  useEffect(() => {
    if (account == null) return;
    const handleEffect = async () => {
      if (web3 == null) return;
      const contract = new NFTContract(web3, account);
      const tokensData = await contract.getYourTokens(address);
      console.log(tokensData);
      if (tokensData == null) return;

      const _tokensData: OwnToken[] = [];

      const promises: Promise<void>[] = [];
      for (let i = 0; i < tokensData.length; i++) {
        const _data = tokensData[i];
        const promise = getIpfsJson(_data.image).then((_p) => {
            console.log(_p)
          if (_p == null) return;
          const __p = _p as {
            index: number,
            url: string
          }
          _tokensData.push({
            id: BigInt(__p.index),
            image: __p.url,
            onSale: _data.onSale,
            tokenPrice: _data.tokenPrice
          });
        });
        promises.push(promise);
      }
      await Promise.all(promises);

      setTokens(_tokensData);
      console.log(_tokensData);
    };
    handleEffect();
  }, [account]);

  return (
    <Card className="col-span-2">
      <CardHeader className="p-5">
        <div className="text-lg font-bold">Assets</div>
      </CardHeader>
      <CardBody>
          <div className="gap-4 flex">
            <div className="grid grid-cols-4 gap-4">
              {tokens &&
                tokens.map((token) => (
                  <Card
                    key={token.id}
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
                      <div><div className="font-bold">#{Number(token.id)}</div> </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
      </CardBody>
      <CardFooter className="p-5 gap-4"> <Button color="warning" onPress={
        async () => {
          if (web3 == null) return;
                if (account == null) return;
                if (address == null) return;
        }
      }> Claim Prize </Button></CardFooter>
    </Card>
  );
}