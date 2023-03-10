import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";

const { chains, provider } = configureChains(
  [chain.goerli], // you can add more chains here like chain.mainnet, chain.optimism etc.
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: "https://rpc.ankr.com/eth_goerli", // go to https://www.ankr.com/protocol/ to get a free RPC for your network
        };
      },
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Next.js Chakra Rainbowkit Wagmi Starter",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
