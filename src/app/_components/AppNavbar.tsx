"use client"
import React from "react"
import { Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react"
import { AcmeLogo } from "./AcmeLogo"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import ConnectWalletButton from "./ConnectWalletButton"
import ConnectedWalletSelect from "./ConnectedWalletSelect"
import { useRouter } from "next/navigation"

const Navbar = () => {
    const account = useSelector((state: RootState) => state.blockchain.account)

    const router = useRouter()

    const _pushCreate = () => router.push("/create")
    const _pushList = () => router.push("/games")
    const _pushAssets = () => router.push("/assets")
    const _pushMarketplace = () => router.push("/marketplace")

    return (
        <NextUINavbar shouldHideOnScroll isBordered>
            <NavbarContent>
                <NavbarBrand>
                    {/* <AcmeLogo /> */}
                    <p className="font-bold text-teal-500">NFT Collect Master</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" className="cursor-pointer" onPress={_pushCreate}>
                        Create
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className="cursor-pointer" onPress={_pushList}>
                        Games
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className="cursor-pointer" onPress={_pushAssets}>
                        Assets
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className="cursor-pointer" onPress={_pushMarketplace}>
                        Marketplace
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {
                    account == ""
                        ? <ConnectWalletButton />
                        : <ConnectedWalletSelect />
                }
            </NavbarContent>
        </NextUINavbar>
    )
}

export default Navbar