import { useState } from "react";
import { TfiExchangeVertical } from "react-icons/tfi";
import styles from "../styles/Converter.module.css";
import dynamic from "next/dynamic";

const WalletDetailModal = dynamic(() => import("./WalletDetail"), {
  loading: () => <p style={{ fontSize: "12px", textAlign: "center" }}>Loading...</p>,
  ssr: false,
});

export default function Converter() {
  const [npr, setNpr] = useState<number>(0);
  const [busd, setBusd] = useState<number>(0);
  const [order, setOrder] = useState<Array<number>>([1, 2]);
  const exchangeRate = 3;

  const convertFromBusdToNpr = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value);
    setBusd(numValue);
    setNpr(Number((numValue / exchangeRate).toFixed(2)));
  };

  const convertFromNprToBusd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value);
    setNpr(numValue);
    setBusd(Number((numValue * exchangeRate).toFixed(2)));
  };

  const renderField = (val: number) => {
    switch (val) {
      case 1:
        return (
          <section className={styles.inputSection}>
            <label>NPR</label>
            <input type="number" value={npr} onChange={convertFromNprToBusd} />
          </section>
        );

      case 2:
        return (
          <section className={styles.inputSection}>
            <label>BUSD</label>
            <input type="number" value={busd} onChange={convertFromBusdToNpr} />
          </section>
        );
    }
  };

  return (
    <div className={styles.converter}>
      <h3 className={styles.titleHeader}>Currency Converter</h3>

      {renderField(order[0])}
      {renderField(order[1])}

      <button
        className={styles.reorderButton}
        onClick={() => {
          const reversedOrder = order[0] == 1 ? [2, 1] : [1, 2];
          setOrder(reversedOrder);
        }}
      >
        <TfiExchangeVertical />
      </button>

      <WalletDetailModal />
    </div>
  );
}
