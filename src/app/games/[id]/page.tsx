"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import All from "./_components/All";
import Assets from "./_components/Assets";

export default function Page() {
  const [count, setCount] = useState(0);

  const params = useParams();

  const address = params.id as string;

  return (
    <div className="grid grid-cols-2 gap-12">
      <All address={address} count={count} setCount={setCount} />
      <Assets address={address} count={count} setCount={setCount} />
    </div>
  );
}
