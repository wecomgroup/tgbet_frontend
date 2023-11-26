import { provider } from "./provider";
import connect from "./index";
import Web3 from "web3";
const connectWalletConnect = async () => {
    try {
        const { state } = connect();
        const web3Provider = await provider.connect();
        let web3 = new Web3(web3Provider);
        web3Provider.on('connect', async (chainId) => {
            console.log('connect....')
            state.status = true;
            state.address =  (await web3.eth.getAccounts())[0];
            state.chainId = chainId
        });
        web3Provider.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
                state.address = accounts[0];
            }
        })
        web3Provider.on("chainChanged", (chainId) => {
            state.chainId = chainId
        });
        web3Provider.on("disconnect", (code, reason) => {
            console.log(code, reason);
            console.log("disconnected");
            state.status = false;
            state.address = "";
            localStorage.removeItem("userState");
        });

    } catch (e) {
        console.log(e)
    }
}
export default connectWalletConnect;
