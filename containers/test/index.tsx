import ModalFiat from '@/components/common/modals/modal-fiat'
import {
    getAddress,
    isLoggedIn,
    requestConnectToDApp,
    requestDisconnectDApp,
    signMessage,
} from '@/connect/ether'
import { setWalletType } from '@/connect/wallet'
import { SupportedWallets } from '@/constants/wallet'
import { selectDataUser } from '@/store/user/selectors'
import { selectWallet } from '@/store/wallet/selectors'
import React, { useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function TestPage() {
    const [isWallet, setIsWallet] = useState(SupportedWallets.ethereum)
    const dataUserStore = useSelector(selectDataUser)
    const { address, chainId } = useSelector(selectWallet)
    const [email, setEmail] = useState('')

    function setWallet(key: SupportedWallets) {
        setIsWallet(key)
        setWalletType(key)
    }

    async function connected() {
        console.log(await isLoggedIn())
    }

    async function testFunc() {
        const address = await getAddress()
        alert(address)
    }

    async function message(eve: any) {
        if (eve.key !== 'Enter') return
        console.log(await signMessage(eve.target.value))
    }

    async function connect() {
        requestConnectToDApp(isWallet, email)
            .then(() => console.log('Connected'))
            .catch((err) => console.error(err))
    }

    async function disconnect() {
        requestDisconnectDApp()
            .then(() => console.log('Disconnected'))
            .catch((err) => console.error(err))
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success">{isWallet}</Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => setWallet(SupportedWallets.ethereum)}
                    >
                        ethereum
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setWallet(SupportedWallets.binance)}
                    >
                        binance
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() =>
                            setWallet(SupportedWallets.walletconnect)
                        }
                    >
                        walletconnect
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setWallet(SupportedWallets.magiclink)}
                    >
                        magiclink
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div>
                <Button onClick={connect}>Connect</Button>
                <Button onClick={disconnect}>Disconnect</Button>
                <Button onClick={() => connected()}>Is connect</Button>
                <input
                    placeholder="Sign Message"
                    type="text"
                    onKeyUp={(eve: any) => {
                        message(eve)
                        setEmail(eve.target.value)
                    }}
                />
                <Button onClick={testFunc}>Test Func</Button>
            </div>

            <div>
                <p>{address}</p>
                <p>{chainId}</p>
            </div>

            <pre>{JSON.stringify(dataUserStore || 'NONE', null, '\t')}</pre>

            <ModalFiat />
        </>
    )
}
