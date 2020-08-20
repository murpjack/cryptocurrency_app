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
  return cryptoRequestState === Status.NOT_LOADED ? (<>Just a second!</>) :
   (
    <div data-test="component-crypto">
      <div>
        <CurrencyDetail label={"Rank"} detail={rank} />
      </div>
      <div>
        <CurrencyDetail label={"Market Cap"} detail={currency.marketCap} />
        <CurrencyDetail label={"24 Hour Volume %"} detail={currency.changePCT24Hour} />
        <CurrencyDetail label={"Circulating Supply"} detail={currency.circulatingSupply} />
      </div>

    </div>
  );
};
export default connect(mapStateToProps)(SingleCryptoPage);
