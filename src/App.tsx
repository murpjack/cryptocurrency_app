import './App.css';
import React from 'react';
import { Crypto, Iso } from "./types";
import { Constants } from "./constants";

import { Link, useRoutes, useQueryParams } from 'raviger';

const countryCodes: Iso[] = [
  { name: "USD", isSelected: true },
  { name: "GBP", isSelected: false },
  { name: "EUR", isSelected: false },
  { name: "JPY", isSelected: false },
  { name: "KRW", isSelected: false }
];

const cryptos: Crypto[] = [{
  Status: Constants.NOT_LOADED,
  Name: "BCH",
  FullName: "Bitcoin Cash",
  MarketCap: 1000000,
  CirculatingSupply: 2000,
  Price: 30,
  Volume24Hour: 3289.12309,
  ChangePCT24Hour: 8.89
}, {
  Status: Constants.NOT_LOADED,
  Name: "BTC",
  FullName: "Bitcoin",
  MarketCap: 1000000,
  CirculatingSupply: 2000,
  Price: 30,
  Volume24Hour: 3289.12309,
  ChangePCT24Hour: 8.89
}];

const NotFoundPage = () => (
  <p>Oops! This page no longer exists.
     Alternatively find up to the minute cryptocurrency values <Link href="/">here</Link>.
  </p>)

interface CurrencyProps {
  currency: Crypto
}

// cryptocurrencies listed on allCurrenciesPage
const CurrencyItem = ({ currency }: CurrencyProps) => {
  let [params, setParams] = useQueryParams();

  return (
    <Link
      href={`/single/${currency.Name.toLowerCase()}`}>
      <p>{currency.FullName}</p>
      <p>{currency.Price}</p>
      <p>{currency.MarketCap}</p>
      <p>{currency.ChangePCT24Hour}</p>
    </Link>
  )
}

const AllCurrenciesPage = () => {
  return (<div data-test="component-cryptos-list">
    {cryptos.map((currency: Crypto, index: any) => (
      <div key={currency.Name}>
        <span>{index + 1}</span>
        <CurrencyItem currency={currency} />
      </div>
    ))}
  </div>)
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

const SingleCurrencyPage = ({ currency }: CurrencyProps) => {
  return (
    <div data-test="component-crypto">
      <div>
        <CurrencyDetail label={"Rank"} detail={"1"} />
      </div>
      <div>
        <CurrencyDetail label={"Market Cap"} detail={`$${currency.MarketCap}`} />
        <CurrencyDetail label={"24 Hour Volume %"} detail={`${currency.ChangePCT24Hour}%`} />
        <CurrencyDetail label={"Circulating Supply"} detail={`${currency.CirculatingSupply}`} />
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
  '/single/:currency': (params: any) => {

    const crypto = cryptos.filter(c => c.Name.toLowerCase() === params.currency)[0];
    console.log(34, crypto);
    return typeof crypto !== "undefined" ? <SingleCurrencyPage currency={crypto} /> : <NotFoundPage />
    // return <SingleCurrencyPage />
  }
};

function App() {
  const routeResult = useRoutes(routes);
  return (
    <div className="App" data-test="component-app">

      <div className="header" data-test="component-header">
        {true ? <Link href="/"><h1>VFCRYPTO</h1></Link> : <CurrencyTitle currency={cryptos[0]} />}

        <div data-test="component-local-currency-dropdown">{countryCodes.map((iso: Iso, index: any) =>
          <span key={iso.name}>{iso.name}</span>)}
        </div>
      </div>

      {routeResult || <NotFoundPage />}
    </div>
  );
}

export default App;
// onClick={(e) => console.log(e)}
