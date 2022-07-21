import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// react toastifylibrary
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/layout";
import "../styles/globals.css";

import { LoginContext } from "../context/loginContext";

import { useEffect } from "react";

import Script from "next/script";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    console.log("Bootstrap js loaded");
  }, []);
  return (
    <LoginContext>
      <Layout>
        {/* <Script
          src='/scripts/modal.js'
          strategy='lazyLoad'
          onLoad={() => console.log("LOADED modal")}
          onError={() => console.error("Error Loading Modal Script")}
        /> */}
        <Component {...pageProps} />
      </Layout>
    </LoginContext>
  );
}
