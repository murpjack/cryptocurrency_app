import { action } from "typesafe-actions";
import { Crypto, Iso } from "./../types";
import { reject, resolve, encaseP, map, chain, fork } from 'fluture/index.js';
import axios from "axios";
import { Constants } from "./../constants";

import store from "./../store";

export enum actionTypes {
  UPDATE_CRYPTOS_REQUEST_STARTED = "UPDATE_CRYPTOS_REQUEST_STARTED",
  UPDATE_CRYPTOS_REQUEST_ERROR = "UPDATE_CRYPTOS_REQUEST_ERROR",
  UPDATE_CRYPTOS_REQUEST_SUCCESS = "UPDATE_CRYPTOS_REQUEST_SUCCESS",
  SELECT_LOCAL_CURRENCY = "SELECT_LOCAL_CURRENCY"
}

// Argument of type '(reject: RejectFunction<unknown>, resolve: ResolveFunction<unknown>) => void'
// is not assignable to parameter of type
// '(reject: RejectFunction<unknown>, resolve: ResolveFunction<unknown>) => Cancel'.
// Type 'void' is not assignable to type 'Cancel'.  TS2345

export function updateCryptos(cryptos: Crypto[]) {
  store.dispatch({ type: actionTypes.UPDATE_CRYPTOS_REQUEST_STARTED });

  const handleResponse = (response: any) => {
      if (response.status === 200 && response.data.Response !== "Error") {
        return reject(response.data.Message);
      } else {
        return resolve(response.data.Data);
      }
    };


  const massageResponse = (data: any) => data.map((item: any) => {
      // returns coinInfo, raw, display
      const currencyValues = item.DISPLAY.keys();
      return currencyValues.map((currency: string) => ({
          [item.CoinInfo.Name + currency]: {
            Name: item.CoinInfo.Name,
            FullName: item.CoinInfo.FullName,
            MarketCap: item.DISPLAY.MKTCAP,
            CirculatingSupply: item.DISPLAY.SUPPLY,
            Price: item.DISPLAY.PRICE,
            Volume24Hour: item.DISPLAY.VOLUME24HOUR,
            ChangePCT24Hour: item.DISPLAY.CHANGEPCT24HOUR
          }
      })).reduce((total: any, curr: any) => Object.assign(total, curr), {});
    });


  const sendError = (message: string) => store.dispatch(
    action(actionTypes.UPDATE_CRYPTOS_REQUEST_ERROR, {
        message
      })
    );

  const sendSuccess = (data: any) => store.dispatch(
      action(actionTypes.UPDATE_CRYPTOS_REQUEST_SUCCESS, {
        data
      })
    );
const state = store.getState()
    const url = `${Constants.API_BASE_URL}/top/mktcapfull?limit=10&tsym=${state.selectedCurrency}`
    const getF: any = encaseP(axios.get);
    return getF(url)
      .pipe(chain(handleResponse))
      .pipe(map(massageResponse))
      .pipe(fork(sendError)(sendSuccess));

}

export function selectLocalCurrency(countryCodes: Iso[]) {
  return action(actionTypes.SELECT_LOCAL_CURRENCY, {
    countryCodes
  });
}
