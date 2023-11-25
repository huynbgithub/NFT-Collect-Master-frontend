"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppNavbar } from "./_components";
import { NextUIProvider, Spacer } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, setAccount } from "@redux";
import { useEffect } from "react";
import { Fireworks } from "@fireworks-js/react"
import { IconContext } from "react-icons";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const web3 = useSelector((state: RootState) => state.blockchain.web3)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
      if (web3 == null) {
          dispatch(setAccount(""))
          return
      }
      const handleEffect = async () => {
          const accounts = await web3.eth.getAccounts()
          const account = accounts[0]
          dispatch(setAccount(account))
      }
      handleEffect()
  }, [web3])

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <Fireworks className="absolute h-screen w-screen"/>
          <AppNavbar />
          <Spacer y={12}/>
          <main className="max-w-[1024px] m-auto px-6">
          {children}
          </main>
          <Spacer y={12}/>
        </NextUIProvider>
      </body>
    </html>
  );
}
