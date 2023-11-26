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
import { NFTContract } from "../../../blockchain/contracts";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@redux";
import { OwnToken } from "../../../blockchain/contracts/nft";
import { getIpfsImageBlobUrl } from "../../../api/next";
import All from "./_components/All";
import Assets from "./_components/Assets";

export default function Page() {
  const web3 = useSelector((state: RootState) => state.blockchain.web3);
  const account = useSelector((state: RootState) => state.blockchain.account);

  const params = useParams();

  const address = params.id as string;

  return (
    <div className="grid grid-cols-2 gap-12">
      <All address={address} />
      <Assets address={address} />
    </div>
  );
}
