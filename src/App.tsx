import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useRoutes } from 'hookrouter';

const NotFoundPage = () => (
  <p>Oops! This page no longer exists. Alternatively find up to the minute cryptocurrency values <a href="/" >here</a>.</p>)

// cryptocurrencies listed on allCurrenciesPage
const CurrencyItem = ({ currency }) => (
  <div>
    <p>{currency.FullName}</p>
    <p>{currency.Price}</p>
    <p>{currency.MktCap}</p>
    <p>{currency.ChangePCT24Hour}</p>
  </div>
)

const AllCurrenciesPage = () => currencies.map((currency, index) =>
  (
    <div key={currency.Name}>
      <span>{index}</span>
      <CurrencyItem currency={currency} />
    </div>
  );


// information container in singleCurrencyPage
const CurrencyDetail = ({ label, detail }) => (
  <div>
    <p>{label}</p>
    <p>{detail}</p>
  </div>)

const SingleCurrencyPage = ({ currency }) => {
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

const CurrencyTitle = ({ currency }) => (
  <div>
    <p>{"<--"}</p>
    <h2>{currency.FullName}</h2>
    <p>{currency.Name}</p>
  </div>
)

const routes = {
  '/': () => <ListCurrenciesPage />,
  '/single/:currency': ({ currency }) => <SingleCurrencyPage currency={currency} />
};

function App() {
  const routeResult = useRoutes(routes);

  return (
    <div className="App">

      <div className="header">
        {true ? <h1>VFCRYPTO</h1> : <CurrencyTitle currency={currency} />}

        <div>{listCurrencyISO.map((iso, index) =>
          <span key={iso.name}>{iso.name}</span>)}
        </div>
      </div>

      routeResult || <NotFoundPage />
    </div>
  );
}

export default App;
