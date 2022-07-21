import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// react toastifylibrary
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/layout";
import "../styles/globals.css";

import { LoginContext } from "../context/loginContext";

import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <LoginContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LoginContext>
  );
}
