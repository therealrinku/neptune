import type { AppProps } from "next/app";
import { Fragment } from "react";
import Meta from "../components/Meta";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Meta />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
