import React from 'react';
import { connect } from 'react-redux'

import styled from "styled-components";
import { device } from "../styles/variables";

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
  selectedCurrency: app.selectedCurrency
})

interface SingleCryptoProps {
  rank: number,
  currency: Crypto,
  selectedCurrency: string
}

export const SingleCryptoPage = ({ rank, currency, selectedCurrency }: SingleCryptoProps) => {
console.log(1);
  return (
    <div data-test="component-crypto">
      <div>
        <CurrencyDetail label={"Rank"} detail={"1"} />
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
