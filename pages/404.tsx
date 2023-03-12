import Link from "next/link";
import styles from "../styles/Page404.module.css";

export default function Page404() {
  return (
    <div className={styles.page404}>
      <p>Page not found. Return <Link href="/">Home</Link>?</p>
    </div>
  );
}
