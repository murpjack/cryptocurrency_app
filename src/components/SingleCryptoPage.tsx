import React from 'react';
import { connect } from 'react-redux'
import styled from "styled-components";
import axios from "axios";
import { Constants } from "./../constants";
import { encaseP, map, fork } from 'fluture/index.js';

import { device } from "../styles/variables";
// import { updateCryptos, selectLocalCurrency } from "./../actions";

import { Crypto, Iso } from "../types";

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
  countryCodes: app.countryCodes
})

interface SingleCryptoProps {
  currency: Crypto,
  cryptos: Crypto[],
  countryCodes: Iso[],
  dispatch: any
}

export const SingleCryptoPage = ({ currency, cryptos, countryCodes, dispatch }: SingleCryptoProps) => {
  const localCurrency: Iso | undefined = countryCodes.find(c => c.isSelected);

  const url = `${Constants.API_BASE_URL}/pricemultifull?fsyms=${currency.Name}&tsyms=${localCurrency ? localCurrency.name : ""}`

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
    .pipe(fork(console.error)(console.log))

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
