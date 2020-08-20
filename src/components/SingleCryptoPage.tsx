import React from 'react';
import { connect } from 'react-redux'

import styled from "styled-components";
import { device } from "../styles/variables";

import { Status } from "../constants";
import { Crypto } from "../types";

interface DetailProps {
  label: string,
  detail: string | number
}

// information container in singleCurrencyPage
const CurrencyDetail = ({ label, detail }: DetailProps) => (
  <div>
    <p>{label}</p>
    <p>{detail}</p>
  </div>)

const StyledPage = styled.div`
  background-color: #f0f;
  height: 90vh;
  margin: 0;
  padding: 0;
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
  return cryptoRequestState === Status.NOT_LOADED || cryptoRequestState === Status.LOADING ? (
    <StyledPage data-test="component-test-crypto">
      <div>
        <CurrencyDetail label={"Rank"} detail={"#"} />
      </div>
      <div>
        <CurrencyDetail label={"Market Cap"} detail={"-"} />
        <CurrencyDetail label={"24 Hour Volume %"} detail={"-"} />
        <CurrencyDetail label={"Circulating Supply"} detail={"-"} />
      </div>
    </StyledPage>
  ) :
    (
      <StyledPage data-test="component-crypto">
        <div>
          <CurrencyDetail label={"Rank"} detail={rank} />
        </div>
        <div>
          <CurrencyDetail label={"Market Cap"} detail={currency.marketCap} />
          <CurrencyDetail label={"24 Hour Volume %"} detail={currency.changePCT24Hour} />
          <CurrencyDetail label={"Circulating Supply"} detail={currency.circulatingSupply} />
        </div>

      </StyledPage>
    );
};


export default connect(mapStateToProps)(SingleCryptoPage);
