import React from 'react';
import { connect } from 'react-redux'

import styled from "styled-components";
import { device } from "../styles/variables";

import { Crypto } from "../types";

interface DetailProps {
  label: string,
  detail: string
}

// information container in singleCurrencyPage
const CurrencyDetail = ({ label, detail }: DetailProps) => (
  <div>
    <p>{label}</p>
    <p>{detail}</p>
  </div>)

const mapStateToProps = ({ app }: any) => ({
  cryptos: app.cryptos,
  selectedCurrency: app.selectedCurrency
})

interface SingleCryptoProps {
  currency: Crypto,
  cryptos: Crypto[],
  selectedCurrency: string
}

export const SingleCryptoPage = ({ currency, cryptos, selectedCurrency }: SingleCryptoProps) => {
  return (
    <div data-test="component-crypto">
      <div>
        <CurrencyDetail label={"Rank"} detail={"1"} />
      </div>
      <div>
        <CurrencyDetail label={"Market Cap"} detail={`$${currency.MarketCap}`} />
        <CurrencyDetail label={"24 Hour Volume %"} detail={`${currency.ChangePCT24Hour}%`} />
        <CurrencyDetail label={"Circulating Supply"} detail={`${currency.CirculatingSupply}`} />
      </div>

    </div>
  );
};
export default connect(mapStateToProps)(SingleCryptoPage);
