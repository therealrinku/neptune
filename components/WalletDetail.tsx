import { Fragment, useEffect, useState } from "react";
import { ethers } from "ethers";
import { FiX, FiToggleRight, FiToggleLeft, FiArchive } from "react-icons/fi";
import styles from "../styles/WalletDetail.module.css";

export default function WalletDetailModal() {
  const [haveMetamask, sethaveMetamask] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [chainId, setChainId] = useState<bigint | undefined>();
  const [accountAddress, setAccountAddress] = useState<string>("");
  const [accountBalance, setAccountBalance] = useState<string | null>(null);

  const [showWalletDetailPopup, setShowWalletDetailPopup] = useState<boolean>(false);

  const { ethereum } = window;

  useEffect(() => {
    ethereum &&
      ethereum.on("accountsChanged", async () => {
        connectWallet();
      });
  }, []);

  const connectWallet = async () => {
    if (!ethereum) {
      sethaveMetamask(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(ethereum);

      let accounts: Array<string> | any = await ethereum.request({ method: "eth_requestAccounts" });

      setAccountAddress(accounts[0]);
      setIsConnected(true);

      const balance = await provider.getBalance(accounts[0]);
      const bal = ethers.formatEther(balance);
      const { chainId } = await provider.getNetwork();

      setAccountBalance(bal);
      setChainId(chainId);
      localStorage.setItem("walletConnected", "true");
    } catch (error) {
      setIsConnected(false);
      localStorage.setItem("walletConnected", "false");
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    localStorage.setItem("walletConnected", "false");
  };

  const onShowWalletDetailButtonClick = () => {
    setShowWalletDetailPopup(true);

    if (localStorage.getItem("walletConnected") === "true" && !isConnected) {
      connectWallet();
    }
  };

  return (
    <Fragment>
      {showWalletDetailPopup && (
        <div className={styles.walletPopupBackdrop}>
          <section className={styles.walletDetailModal}>
            <div className={styles.topNav}>
              <h3>Wallet Details</h3>
              <button onClick={() => setShowWalletDetailPopup(false)}>
                <FiX />
              </button>
            </div>

            {!isConnected && (
              <Fragment>
                <p className={styles.accountNotConnectedText}>Account not connected yet.</p>

                <button disabled={!haveMetamask} className={styles.connectWalletButton} onClick={connectWallet}>
                  <FiToggleRight /> <p>Connect Wallet</p>
                </button>

                {!haveMetamask && (
                  <p className={styles.metamaskNotFoundMessage}>
                    Metamask extension not found. please install it first and try again.
                  </p>
                )}
              </Fragment>
            )}

            {isConnected && (
              <Fragment>
                <table className={styles.accountDetailsTable}>
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Contract Address</td>
                      <td>{accountAddress}</td>
                    </tr>

                    <tr>
                      <td>Chain ID</td>
                      <td>{chainId?.toString()}</td>
                    </tr>

                    <tr>
                      <td>Balance</td>
                      <td>{accountBalance}</td>
                    </tr>
                  </tbody>
                </table>

                <button className={styles.disconnectWalletButton} onClick={disconnectWallet}>
                  <FiToggleLeft /> <p>Disconnect Wallet</p>
                </button>
              </Fragment>
            )}
          </section>
        </div>
      )}

      <button className={styles.showWalletDetailButton} onClick={onShowWalletDetailButtonClick}>
        <FiArchive /> <p>Show Wallet Details</p>
      </button>
    </Fragment>
  );
}
