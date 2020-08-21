import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'raviger';
import styled from "styled-components";

import { device, colours } from "../styles/variables";

import { Status } from "../constants";
import { Crypto } from "../types";

const StyledItem = styled.div`
  color: ${colours.fontListItem};
  display: flex;
  height: 45px;
  margin: 0;
  padding: 0;
  width: 100%;

  a {
    color: inherit;
    display: block;
    height: 45px;
    margin-right: 10px;
    min-width: 40px;
    text-decoration: none;
  }

  p {
    display: inline-block;
    font-size: 1em;
    font-weight: 300;
    height: 45px;
    line-height: 45px;
    margin: 0;
    width: 100%;
  }

  span {

  }

  img {
    border-radius: 50px;
    display: inline-block;
    height: 32px;
    width: 32px;
  }
`;

const StyledItemTitle = styled.div`
  // Font colour from design is too light so the header shares its colour with StyledItem
  background-color: ${colours.bgListHeader};
`;

interface ItemProps {
  currency: Crypto;
  rank?: string | number;
}

const CryptoItem = ({ currency, rank }: ItemProps) => (
  <StyledItem>
    <p>
      <span>{rank ? rank : "#"}</span>
      <img src={currency.imageUrl} alt={currency.fullName} />
      <span>{currency.fullName}</span>
    </p>
    <p>{currency.price}</p>
    <p>{currency.marketCap}</p>
    <p>{currency.changePCT24Hour}</p>
  </StyledItem>
)

const StyledList = styled.div`
  margin: 0px 0px;
  padding: 0 0px;
  width: 100%;

  a {
    color: inherit;
    height: 45px;
    margin-right: 10px;
    min-width: 40px;
    text-decoration: none;
  }
`;

const mapStateToProps = ({ app }: any) => ({
  cryptos: app.cryptos,
  selectedCurrency: app.selectedCurrency,
  cryptoRequestState: app.cryptoRequestState
})

interface AllCryptoProps {
  cryptos: Crypto[],
  selectedCurrency: string,
  cryptoRequestState: string
}

export const AllCryptosPage = ({ cryptos, selectedCurrency, cryptoRequestState }: AllCryptoProps) => {

  const placeholders: any[] = Array.from(Array(10).keys()).map(i =>
    ({
      name: "Crypto",
      fullName: "Loading",
      price: "-",
      marketCap: "-",
      changePCT24Hour: "-",
      imageUrl: "./images/placeholder.png"
    }));

  return (
    <>
      <StyledItemTitle>
        <div className="wrapper">
          <StyledItem>
            <p>CRYPTOCURRENCY</p>
            <p>PRICE</p>
            <p>MARKET CAP</p>
            <p>24H CHANGE</p>
          </StyledItem>
        </div>
      </StyledItemTitle>
      <div className="wrapper">
        <StyledList>

          {cryptoRequestState === Status.NOT_LOADED || cryptoRequestState === Status.LOADING ?
            placeholders.map((crypto: any, index: any) => (
              <div key={index}>
                <CryptoItem currency={crypto} />
              </div>
            ))
            : Object.values(cryptos).filter(c => c.reference === selectedCurrency).map((crypto: Crypto, index: any) => (
              <Link key={index} href={`/single/${crypto.name.toLowerCase()}`}>
                <CryptoItem currency={crypto} rank={index + 1} />
              </Link>
            ))}
        </StyledList>
      </div>
    </>)
};

export default connect(mapStateToProps)(AllCryptosPage);
