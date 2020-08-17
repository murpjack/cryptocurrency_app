import { combineReducers, createStore } from "redux";
import { AppState } from "./types";
import { Constants } from "./constants";

/*
crypto statuses: 
  "NOT_LOADED",
  "LOAD_SUCCESS",
  "LOAD_FAIL"
*/

const initialState: AppState = {
  countryCodes: [
    { name: "USD", isSelected: true },
    { name: "GBP", isSelected: false },
    { name: "EUR", isSelected: false },
    { name: "JPY", isSelected: false },
    { name: "KRW", isSelected: false }
  ],
  cryptos: Array.from(
    Array(10).map(c => ({
      Status: Constants.NOT_LOADED,
      Name: "ABR",
      FullName: "Cryptocurrency",
      MarketCap: 1000000,
      CirculatingSupply: 100000,
      Price: 30,
      Volume24Hour: 3289.12309,
      ChangePCT24Hour: 8.89
    }))
  )
};

export function reducer(state: AppState = initialState, action: any): AppState {
  switch (action.type) {
    case Constants.UPDATE_CRYPTOS:
      return {
        ...state,
        cryptos: action.payload.cryptos
      };
    case Constants.SELECT_LOCAL_CURRENCY:
      return {
        ...state,
        countryCodes: action.payload.countryCodes
      };

    default:
      return state;
  }
}

export interface RootState {
  currencies: AppState;
}

const store = createStore<RootState, any, any, any>(
  combineReducers({
    currencies: reducer
  })
);

export default store;
