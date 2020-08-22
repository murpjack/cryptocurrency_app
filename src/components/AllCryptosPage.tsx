import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'raviger';
import styled from "styled-components";

import { device, colours } from "../styles/variables";

import { Status } from "../constants";
import { Crypto } from "../types";

const StyledItem = styled.div`
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  color: ${colours.fontListItem};
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  width: 100%;

  p {
    display: inline-block;
    font-size: 1em;
    font-weight: 300;
    height: 60px;
    line-height: 60px;
    margin: 0;
    width: 100%;
  }

  .detail__value {
    color: #fff;
    display: inline-block;
    letter-spacing: 1px;
    position: relative;

    &--currency {
      color: ${colours.fontSinglePageLabel};
    }
`;

const StyledRank = styled.span`
  display: inline-block;
  min-width: 20px;
  text-align: center;
`;

const StyledIcon = styled.img`
  border-radius: 50px;
  display: inline-block;
  height: 32px;
  margin: -10px 12px;
  width: 32px;
`;

const StyledCryptoTitle = styled.p`
  min-width: 300px;
`;

const StyledCryptoValue = styled(StyledCryptoTitle)`
  // min-width: 300px;
`;

const StyledListTitle = styled.p`
  min-width: 200px;
`;

const StyledListValue = styled(StyledListTitle)`
  // min-width: 100px;
`;

const StyledDiffTitle = styled.p`
  text-align: right;
  max-width: 100px;
`;

const StyledDiffValue = styled(StyledDiffTitle)`
  text-align: right;
  // max-width: 100px;
`;

const StyledLink = styled(Link)`
  color: inherit;
  display: block;
  height: 60px;
  margin-right: 10px;
  min-width: 40px;
  text-decoration: none;
`;

const StyledItemTitle = styled.div`
  // Font colour from design is too light so the header shares its colour with StyledItem
  background-color: ${colours.bgListHeader};
  border-top: 1px solid ${colours.fontSinglePageLabel};
  border-bottom: 1px solid ${colours.fontSinglePageLabel};

  div {
    border: none;
    height: 30px;
  }

  p {
    color: ${colours.fontSinglePageLabel};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    line-height: 30px;
    margin: 0;
  }
`;

interface ItemProps {
  currency: Crypto;
  rank?: string | number;
}

const CryptoItem = ({ currency, rank }: ItemProps) => (
  <StyledItem>
    <StyledCryptoValue>
      <StyledRank>{rank ? rank : "#"}</StyledRank>
      <StyledIcon src={currency.imageUrl} alt={currency.fullName} />
      <span>{currency.fullName}</span>
    </StyledCryptoValue>
    <StyledListValue><span className="detail__value--currency">{currency.selectedCurrencySymbol}</span> {currency.price}</StyledListValue>
    <StyledListValue><span className="detail__value--currency">{currency.selectedCurrencySymbol}</span> {currency.marketCap}</StyledListValue>
    <StyledDiffValue>{currency.changePCT24Hour}</StyledDiffValue>
  </StyledItem>
)

const StyledList = styled.div`
  margin: 0px 0px;
  padding: 0 0px;
  width: 100%;
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
            <StyledCryptoTitle>CRYPTOCURRENCY</StyledCryptoTitle>
            <StyledListTitle>PRICE</StyledListTitle>
            <StyledListTitle>MARKET CAP</StyledListTitle>
            <StyledDiffTitle>24H CHANGE</StyledDiffTitle>
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
              <StyledLink key={index} href={`/single/${crypto.name.toLowerCase()}`}>
                <CryptoItem currency={crypto} rank={index + 1} />
              </StyledLink>
            ))}
        </StyledList>
      </div>
    </>)
};

export default connect(mapStateToProps)(AllCryptosPage);
