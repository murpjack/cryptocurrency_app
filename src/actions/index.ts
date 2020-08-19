import { action } from "typesafe-actions";
import { reject, resolve, encaseP, map, chain, fork } from "fluture/index.js";
import axios from "axios";
import { Constants } from "./../constants";

import store from "./../store";

export enum actionTypes {
  UPDATE_CRYPTOS_REQUEST_STARTED = "UPDATE_CRYPTOS_REQUEST_STARTED",
  UPDATE_CRYPTOS_REQUEST_ERROR = "UPDATE_CRYPTOS_REQUEST_ERROR",
  UPDATE_CRYPTOS_REQUEST_SUCCESS = "UPDATE_CRYPTOS_REQUEST_SUCCESS",
  SELECT_LOCAL_CURRENCY = "SELECT_LOCAL_CURRENCY"
}

export function updateCryptos(selectedCurrency: string, ) {
  store.dispatch({ type: actionTypes.UPDATE_CRYPTOS_REQUEST_STARTED });

  const handleResponse = (response: any) => {
    if (response.status !== 200 || response.data.Response === "Error") {
      return reject(response.data.Message);
    } else {
      // response.data.Data --> array
      return resolve(response.data.Data);
    }
  };

  const massageResponse = (data: any) =>
    data.map((item: any) => {
      // returns coinInfo, raw, display
      const currencyValues = Object.keys(item.DISPLAY);
      return currencyValues
        .map((currency: string) => ({
          [item.CoinInfo.Name + currency]: {
            Reference: currency,
            Name: item.CoinInfo.Name,
            FullName: item.CoinInfo.FullName,
            MarketCap: item.DISPLAY[currency].MKTCAP,
            CirculatingSupply: item.DISPLAY[currency].SUPPLY,
            Price: item.DISPLAY[currency].PRICE,
            Volume24Hour: item.DISPLAY[currency].VOLUME24HOUR,
            ChangePCT24Hour: item.DISPLAY[currency].CHANGEPCT24HOUR
          }
        }))
        .reduce((total: any, curr: any) => ({ ...total, ...curr }), {});
    })
    .reduce((total: any, curr: any) => ({ ...total, ...curr }), {});

  const sendError = (message: string) =>
    store.dispatch(
      action(actionTypes.UPDATE_CRYPTOS_REQUEST_ERROR, {
        message
      })
    );

  const sendSuccess = (data: any) => {
    return store.dispatch(
      action(actionTypes.UPDATE_CRYPTOS_REQUEST_SUCCESS, {
        data
      })
    );
  };
  console.log(54,selectedCurrency);

  const url = `${Constants.API_BASE_URL}/top/mktcapfull?limit=10&tsym=${selectedCurrency}`;
  const getF: any = encaseP(axios.get);
  return getF(url)
    .pipe(chain(handleResponse))
    .pipe(map(massageResponse))
    .pipe(fork(sendError)(sendSuccess));
}

export function selectLocalCurrency(selected: string) {
  return action(actionTypes.SELECT_LOCAL_CURRENCY, {
    selected
  });
}
