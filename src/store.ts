import { combineReducers, createStore } from "redux";
import { AppState } from "./types";
import { Status } from "./constants";
import { actionTypes } from "./actions";

/*
crypto statuses:
  "NOT_LOADED",
  "LOADING",
  "LOAD_SUCCESS",
  "LOAD_FAIL"
*/

export const localCurrencies: string[] = [ "USD", "GBP", "EUR", "JPY", "KRW"];

export const initialState: AppState = {
  selectedCurrency: localCurrencies[0],
  cryptos: [],
  cryptoRequestState: Status.NOT_LOADED,
  cryptoRequestFailure: ""
};

export function reducer(state: AppState = initialState, action: any): AppState {
  switch (action.type) {
    case actionTypes.UPDATE_CRYPTOS_REQUEST_SUCCESS:
      return {
        ...state,
        cryptos: action.payload.cryptos,

      };
    case actionTypes.SELECT_LOCAL_CURRENCY:
      return {
        ...state,
        selectedCurrency: action.payload.selectedCurrency
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
