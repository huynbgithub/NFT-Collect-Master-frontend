import React from "react"
import { Link } from "@nextui-org/react"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { shortenAddress } from "@utils"
import { KLAYTN_TESTNET_HTTP_RPC_URL } from "@blockchain"

interface ViewOnExplorerProps {
  className?: string;
  hexString: string;
  isTransaction?: boolean;
  showShorten?: boolean;
  notExternal?: boolean
}

const ViewOnExplorer = (props: ViewOnExplorerProps) => {
    const explorerUrl = KLAYTN_TESTNET_HTTP_RPC_URL 
    
    const _external = !props.notExternal
    const _middle = props.isTransaction ? "tx" : "address"
    
    const _content = props.showShorten ? shortenAddress(props.hexString) : "View on Explorer"
    return (
        <Link
            isExternal = {_external}
            href={`${explorerUrl}${_middle}/${props.hexString}`}
            className={`font-bold text-sm ${props.className}`}
            color="foreground"
            showAnchorIcon={!props.showShorten}
        >
            {_content}
        </Link>
    )
}

export default ViewOnExplorer
