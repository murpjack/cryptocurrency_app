import './App.css';
import React from 'react';
import { Crypto, Iso } from "./types";
import store from "./store";
import { Constants } from "./constants";

import { useRoutes } from 'hookrouter';

const NotFoundPage = () => (
  <p>Oops! This page no longer exists.
     Alternatively find up to the minute cryptocurrency values <a href="/" >here</a>.
  </p>)

interface CurrencyProps {
  currency: Crypto
}

// cryptocurrencies listed on allCurrenciesPage
const CurrencyItem = ({ currency }: CurrencyProps) => (
  <div>
    <p>{currency.FullName}</p>
    <p>{currency.Price}</p>
    <p>{currency.MarketCap}</p>
    <p>{currency.ChangePCT24Hour}</p>
  </div>
)

const AllCurrenciesPage = () => {
const state = store.getState();
  return state.cryptos.map((currency: Crypto, index: any) => (
    <div key={currency.Name}>
      <span>{index}</span>
      <CurrencyItem currency={currency} />
    </div>
  ))
};


interface DetailProps {
  label: string,
  detail: string
}

// information container in singleCurrencyPage
const CurrencyDetail = ({ label, detail }: DetailProps) => (
  <div>
    <p>{label}</p>
    <p>{detail}</p>
  </div>)

const SingleCurrencyPage = ({ currency }:CurrencyProps) => {
  return (
    <div>
      <div>
        <CurrencyDetail label={"Rank"} detail={"1"} />

      </div>
      <div>
        <CurrencyDetail label={"Market Cap"} detail={"123456"} />
        <CurrencyDetail label={"24 Hour Volume %"} detail={"12%"} />
        <CurrencyDetail label={"Circulating Supply"} detail={"456"} />
      </div>

    </div>
  );
};

const CurrencyTitle = ({ currency }: CurrencyProps) => (
  <div>
    <p>{"<--"}</p>
    <h2>{currency.FullName}</h2>
    <p>{currency.Name}</p>
  </div>
)

const routes = {
  '/': () => <AllCurrenciesPage />,
  '/single/:currency': (params: any) => <SingleCurrencyPage currency={params.currency} />
};

function App() {
  const routeResult = useRoutes(routes);

  const currency = {
      Status: Constants.NOT_LOADED,
      Name: "BTC",
      FullName: "Bitcoin",
      MarketCap: 1000000,
      CirculatingSupply: 2000,
      Price: 30,
      Volume24Hour: 3289.12309,
      ChangePCT24Hour: 8.89
  };

  const countryCodes: Iso[] = [
    {name: "USD", isSelected: true},
    {name: "GBP", isSelected: false},
    {name: "EUR", isSelected: false},
    {name: "JPY", isSelected: false},
    {name: "KRW", isSelected: false}
  ];

  return (
    <div className="App">

      <div className="header">
        {true ? <h1>VFCRYPTO</h1> : <CurrencyTitle currency={currency} />}

        <div>{countryCodes.map((iso: Iso, index: any) =>
          <span key={iso.name}>{iso.name}</span>)}
        </div>
      </div>

      { routeResult } || <NotFoundPage />
    </div>
  );
}

export default App;
