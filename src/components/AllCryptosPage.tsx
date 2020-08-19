import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'raviger';
import styled from "styled-components";
import axios from "axios";

import { Constants } from "./../constants";
import { encaseP, chain, map, fork } from 'fluture/index.js';

import { device } from "../styles/variables";
import { updateCryptos, selectLocalCurrency } from "./../actions";
import { CurrencyProps, Crypto, Iso } from "../types";

// cryptocurrencies listed on allCurrenciesPage
const CurrencyItem = ({ currency }: CurrencyProps) => {
  return (
    <Link
      href={`/single/${currency.Name.toLowerCase()}`}
    >
      <p>{currency.FullName}</p>
      <p>{currency.Price}</p>
      <p>{currency.MarketCap}</p>
      <p>{currency.ChangePCT24Hour}</p>
    </Link>
  )
}

const mapStateToProps = ({ app }: any) => ({
  cryptos: app.cryptos,
  countryCodes: app.countryCodes
})

interface AllCryptoProps {
  cryptos: Crypto[],
  countryCodes: Iso[],
  dispatch: any
}

export const AllCryptosPage = ({ cryptos, countryCodes, dispatch }: AllCryptoProps) => {
  const localCurrency: Iso | undefined = countryCodes.find(c => c.isSelected);
  const url = `${Constants.API_BASE_URL}/top/mktcapfull?limit=10&tsym=${localCurrency ? localCurrency.name : ""}`

  const handleResponse = (response: any) => {
    if (response.status === 200 && response.data.Response !== "Error") {
      return response.data;
    }
    return {
      Data: response.data.Data,
      Message: response.data.Message
    }
  }



  const getF = encaseP(axios.get);
  getF(url)
    .pipe(map(handleResponse))
    .pipe(fork(console.error)(console.log));

  return (<div data-test="component-cryptos-list">
    {cryptos.map((currency: Crypto, index: any) => (
      <div key={currency.Name}>
        <span>{index + 1}</span>
        <CurrencyItem currency={currency} />
      </div>
    ))}
  </div>)
};

export default connect(mapStateToProps)(AllCryptosPage);
