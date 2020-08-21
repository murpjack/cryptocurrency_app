import React from 'react';
import { connect } from 'react-redux'

import styled from "styled-components";
import { device, colours } from "../styles/variables";

import { Status } from "../constants";
import { Crypto } from "../types";

const StyledPage = styled.div`
  background-color: ${colours.bgSinglePage};
  height: 100vh;
  margin: 0;
  padding: 0;

  a {
    color: inherit;
    height: 45px;
    margin-right: 10px;
    min-width: 40px;
    text-decoration: none;
  }

  .wrapper {
    @media ${device.tablet} {
      display: grid;
      height: 200px;
      grid-template-columns: [start] 1fr [line2] 1fr [line3] 1fr [end];
      grid-template-rows: [drop1] 1fr [drop2] 1fr ;
      padding-top: 50px;
    }
  }
  `;

  const StyledDetail = styled.div`
    align-self: center;
    justify-self: center;
    margin: 0;
    padding: 0;
    width: 100%;

    .detail__label {
      color: ${colours.fontSinglePageLabel};
      font-weight: 700;
      line-height: 1.4;
      margin-bottom: 10px;
      font-size: 11px;
      letter-spacing: 1px;

    }
    .detail__value {
      color: #fff;
      letter-spacing: 1px;
      &--currency {
        color: ${colours.fontSinglePageLabel};
      }
      &--crypto {
        color: #2dd47b;
        font-weight: 700;
        line-height: 1.4;
        font-size: 11px;
        letter-spacing: 1px;
      }
    }
    `;

  const StyledDetailTaller = styled(StyledDetail)`
  @media ${device.tablet} {
    grid-row-start: 1;
    grid-row-end: span dropped;

    p {
      display: inline-block;
      &:last-of-type {
        padding-left: 30px;

      }
    }
  }
  `;

const mapStateToProps = ({ app }: any) => ({
  selectedCurrency: app.selectedCurrency,
  cryptoRequestState: app.cryptoRequestState
})

interface SingleCryptoProps {
  rank: number,
  currency: Crypto,
  selectedCurrency: string,
  cryptoRequestState: string
}

export const SingleCryptoPage = ({ rank, currency, selectedCurrency, cryptoRequestState }: SingleCryptoProps) => {
  const notLoaded = cryptoRequestState === Status.NOT_LOADED || cryptoRequestState === Status.LOADING;
  return (
    <StyledPage data-test="component-crypto">
      <div className="wrapper">
        <StyledDetailTaller>
          <p className="detail__label">{"RANK"}</p>
          <p className="detail__value">{notLoaded ? "#" : rank}</p>
        </StyledDetailTaller>
        <StyledDetail>
          <p className="detail__label">{"MARKET CAP"}</p>
          <p className="detail__value">{notLoaded ? "$ 100,000,000" : currency.marketCap}</p>
        </StyledDetail>
        <StyledDetail>
          <p className="detail__label">{"24 HOUR VOLUME"}</p>
          <p className="detail__value">{notLoaded ? "$ 100,000,000" : currency.volume24Hour}</p>
        </StyledDetail>
        <StyledDetail>
          <p className="detail__label">{"CIRCULATING SUPPLY"}</p>
          <p className="detail__value">{notLoaded ? "21,000,000 CRY" : (<>{currency.circulatingSupply} <span className="detail__value--crypto">{currency.name}</span></>)}</p>
        </StyledDetail>
      </div>
    </StyledPage>
  );
};


export default connect(mapStateToProps)(SingleCryptoPage);
