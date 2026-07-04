import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PrivyProvider } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";
import App from "./App";
import "./styles.css";
import { PrivyUserSync } from "@/components/web3/PrivyUserSync";

const privyAppId = import.meta.env.VITE_PRIVY_APP_ID || "missing-privy-app-id";
const hasPrivyAppId = Boolean(
  privyAppId && privyAppId !== "missing-privy-app-id" && privyAppId !== "...",
);

const appShell = (
  <HelmetProvider>
    <BrowserRouter>
      {hasPrivyAppId ? <PrivyUserSync /> : null}
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {hasPrivyAppId ? (
      <PrivyProvider
        appId={privyAppId}
        config={{
          loginMethods: ["email", "sms", "google", "wallet"],
          appearance: {
            theme: "light",
            accentColor: "#5B21B6",
            landingHeader: "Create your OxVerse identity",
            loginMessage: "Sign in to unlock your student dashboard and Web3 wallet.",
            walletChainType: "ethereum-only",
          },
          supportedChains: [baseSepolia],
          defaultChain: baseSepolia,
          embeddedWallets: {
            ethereum: {
              createOnLogin: "users-without-wallets",
            },
          },
        }}
      >
        {appShell}
      </PrivyProvider>
    ) : (
      appShell
    )}
  </React.StrictMode>,
);
