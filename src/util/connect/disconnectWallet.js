import connect from "./index";
import { provider } from "./provider";
const disconnectWallet = async () => {
    const { state } = connect();
    await provider.disconnect();
    state.status = false;
    state.address = "";
    localStorage.removeItem("userState");
}
export default disconnectWallet;
