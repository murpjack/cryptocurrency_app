import { combineReducers, createStore } from "redux";
import { AppState } from "./types";
import { Constants } from "./constants";
import { actionTypes } from "./actions";

/*
crypto statuses:
  "NOT_LOADED",
  "LOAD_SUCCESS",
  "LOAD_FAIL"
*/

export const initialState: AppState = {
  countryCodes: [
    { name: "USD", isSelected: true },
    { name: "GBP", isSelected: false },
    { name: "EUR", isSelected: false },
    { name: "JPY", isSelected: false },
    { name: "KRW", isSelected: false }
  ],
  cryptos: Array.from(
    Array(10).keys()).map(c => ({
      Status: Constants.NOT_LOADED,
      IsSelected: false,
      Name: "ABR",
      FullName: "Cryptocurrency",
      MarketCap: 1000000,
      CirculatingSupply: 100000,
      Price: 30,
      Volume24Hour: 3289.12309,
      ChangePCT24Hour: 8.89
    }))

};

export function reducer(state: AppState = initialState, action: any): AppState {
  switch (action.type) {
    case actionTypes.UPDATE_CRYPTOS:
      return {
        ...state,
        cryptos: action.payload.cryptos
      };
    case actionTypes.SELECT_LOCAL_CURRENCY:
      return {
        ...state,
        countryCodes: action.payload.countryCodes
      };

    default:
      return state;
  }
}

export interface RootState {
  app: AppState;
}

const store = createStore<RootState, any, any, any>(
  combineReducers({
    app:reducer
  })
);

export default store;
