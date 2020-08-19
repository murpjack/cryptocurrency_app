import './App.css';
import React, { useEffect } from 'react';
import { useRoutes } from 'raviger';

import { AppState } from "./types";
import store from "./store";
import { updateCryptos } from "./actions";

import Header from "./components/Header";
import AllCryptosPage from "./components/AllCryptosPage";
import SingleCryptoPage from "./components/SingleCryptoPage";
import NotFoundPage from "./components/NotFoundPage";

const routes = {
  '/': () => <AllCryptosPage />,
  '/single/:currency': (params: any) => {
    const state: AppState = store.getState().app;
    const crypto = state.cryptos.find(c => c.Name.toLowerCase() === params.currency);
    return typeof crypto === "undefined" ? <NotFoundPage /> : <SingleCryptoPage currency={crypto} />
  }
};

function App() {
  const routeResult = useRoutes(routes);

  useEffect(() => {
    const state: AppState = store.getState().app;
    updateCryptos(state.selectedCurrency)
    
  }, []);

  return (
    <div className="App" data-test="component-app">
      <Header />
      {routeResult || <NotFoundPage />}
    </div>
  );
}

export default App;
