import { useEffect, useState } from 'react';
import './App.css';
import useArConnect from 'use-arconnect';
import CancelIcon from '@mui/icons-material/Cancel';
import Profile from './Profile';

const arConnectPermissions = [
  "ACCESS_ADDRESS",
  "ACCESS_ALL_ADDRESSES",
  "SIGN_TRANSACTION",
];

function App() {
  const arConnect = useArConnect();
  const [walletAddr, setWalletAddr] = useState<string>("");

  useEffect(() => {
    if (!arConnect) return;
    (async () => {
      try {
        if ((await arConnect.getPermissions()).includes("ACCESS_ADDRESS")) {
          setWalletAddr(await arConnect.getActiveAddress());
        }
      } catch {
        alert("Error: Could not get ACCESS_ADDRESS permission");
      }
    })();
  }, [arConnect, walletAddr, setWalletAddr]);

  const connectWallet = async () => {
    if (!arConnect) return window.open("https://arconnect.io");
    try {
      await arConnect.connect(arConnectPermissions);
      setWalletAddr(await arConnect.getActiveAddress());
    } catch {
      alert("Error: Could not connect to ArConnect");
    }
  };

  const disconnectWallet = async () => {
    await arConnect.disconnect();
    setWalletAddr("");
  };

  return (
    <div className="App">
      {walletAddr === ""
      ? <div onClick={connectWallet} style={{cursor: "pointer"}}>
          <img src="https://7raizsvioke4bdkyrwmaucyzjec2cbzx5mnavefm33yidjezezvq.arweave.net/_ECMyqhyicCNWI2YCgsZSQWhBzfrGgqQrN7wgaSZJms" alt="ArConnect" />
          <span className="text">{arConnect ? 'Log in' : 'Sign up'}</span>
        </div>
      : <>
          <div onClick={disconnectWallet} style={{cursor: "pointer"}}>
            <CancelIcon /><span className="text">Logout</span>
          </div>
          <Profile walletAddr={walletAddr} />
        </>}
    </div>
  );
}

export default App;
