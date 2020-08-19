import {actionTypes, updateCryptos, selectLocalCurrency} from "./";
import {initialState} from "../store"

describe("updateCryptos", () => {
  test("returns an action with type `UPDATE_CRYPTOS`", () => {
      const action = updateCryptos(initialState.cryptos);
      expect(action).toEqual({
        type: actionTypes.UPDATE_CRYPTOS,
        payload: {cryptos: initialState.cryptos},
        meta: undefined,
        error: undefined
      });
  });
});

describe("selectLocalCurrency", () => {
  test("returns an action with type `SELECT_LOCAL_CURRENCY`", () => {
      const action = selectLocalCurrency(initialState.selectedCurrency);
      expect(action).toEqual({
        type: actionTypes.SELECT_LOCAL_CURRENCY,
        payload: {selectedCurrency: initialState.selectedCurrency},
        meta: undefined,
        error: undefined
      });
  });
});
