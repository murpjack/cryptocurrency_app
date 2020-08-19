import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'raviger';
import styled from "styled-components";
import axios from "axios";

import { Constants } from "./../constants";
import { encaseP, map, fork } from 'fluture/index.js';

import { device, colours } from "../styles/variables";
// import { updateCryptos, selectLocalCurrency } from "./../actions";
import { CurrencyProps, Crypto, Iso } from "../types";

const StyledItem = styled.div`
  color: ${colours.fontListItem}
  height: 45px;
  margin: 0;
  padding: 0;
  width: 100%;

  a {
    color: inherit;
    display: inline-block;
    height: 45px;
    margin-right: 10px;
    min-width: 40px;
    text-decoration: none;
  }

  p {
    display: inline-block;
    font-size: 1em;
    font-weight: 300;
    line-height: 45px;
    margin: 0;
    max-width: 25%;
  }
`;

const StyledItemTitle = styled(StyledItem)`
  background-color: ${colours.bgListHeader};
  // Font colour from design is too light so the header shares its colour with StyledItem
`;

// cryptocurrencies listed on allCurrenciesPage
const CurrencyItem = ({ currency }: CurrencyProps) => {
  return (
    <StyledItem>
      <Link href={`/single/${currency.Name.toLowerCase()}`}>
        <p>{currency.FullName}</p>
      </Link>
      <p>{currency.Price}</p>
      <p>{currency.MarketCap}</p>
      <p>{currency.ChangePCT24Hour}</p>
    </StyledItem>
  )
}

const StyledList = styled.div`
  margin: 20px 0 40px;
  padding: 0 15px;
  width: 100%;

  a {
    color: inherit;
    display: inline-block;
    height: 45px;
    margin-right: 10px;
    min-width: 40px;
    text-decoration: none;
  }
`;

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

  return (
    <StyledList>
      <StyledItemTitle>
        <p>CRYPTOCURRENCY</p>
        <p>PRICE</p>
        <p>MARKET CAP</p>
        <p>24H CHANGE</p>
      </StyledItemTitle>

      {cryptos.map((currency: Crypto, index: any) => (
        <div key={index}>
          <span>{index + 1}</span>
          <CurrencyItem currency={currency} />
        </div>
      ))}
    </StyledList>)
};

export default connect(mapStateToProps)(AllCryptosPage);
