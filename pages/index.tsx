import Converter from "../components/Converter";
import styles from "../styles/Homepage.module.css";

export default function Homepage() {
  return (
    <div className={styles.homepage}>
      <h1>Neptune Mutual Currency Converter</h1>
      <Converter />
    </div>
  );
}
