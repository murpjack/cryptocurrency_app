import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'raviger';
import styled from "styled-components";

import { device, colours } from "../styles/variables";
import { Crypto } from "../types";

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
  // Font colour from design is too light so the header shares its colour with StyledItem
  background-color: ${colours.bgListHeader};
`;

interface ItemProps {
  currency: Crypto;
}

// cryptocurrencies listed on allCurrenciesPage
const CryptoItem = ({ currency }: ItemProps) => {
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
  selectedCurrency: app.selectedCurrency
})

interface AllCryptoProps {
  cryptos: Crypto[],
  selectedCurrency: string
}

export const AllCryptosPage = ({ cryptos, selectedCurrency }: AllCryptoProps) => {
  console.log(cryptos);

  return (
    <StyledList>
      <StyledItemTitle>
        <p>CRYPTOCURRENCY</p>
        <p>PRICE</p>
        <p>MARKET CAP</p>
        <p>24H CHANGE</p>
      </StyledItemTitle>

      {Object.values(cryptos).filter(c => c.Reference === selectedCurrency).map((crypto: Crypto, index: any) => (
        <div key={index}>
          <span>{index + 1}</span>
          <CryptoItem currency={crypto} />
        </div>
      ))}
    </StyledList>)
};

export default connect(mapStateToProps)(AllCryptosPage);
