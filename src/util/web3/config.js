import WalletConnectProvider from '@walletconnect/web3-provider';

import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const providerOptions = {
    // https://docs.walletconnect.org/
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: "f351cca09af04b4caafbeedae406acd0", // TODO infuraId
            qrcodeModalOptions: {
                mobileLinks: [
                    "rainbow",
                    "metamask",
                    "trust",
                    "imtoken",
                    "pillar",
                ],
                desktopLinks: [
                    // "encrypted ink",
                ]
            }
        },
    },
    coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
            appName: "chainCredit", // Required
            infuraId: "f351cca09af04b4caafbeedae406acd0", // Required
            rpc: "", // Optional if `infuraId` is provided; otherwise it's required
            chainId: 1, // Optional. It defaults to 1 if not provided
            darkMode: false
        }
    }
};

export { providerOptions };
