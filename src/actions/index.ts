import { action } from 'typesafe-actions';
import { Crypto, Iso } from "./../types";

export enum actionTypes {
  UPDATE_CRYPTOS = "UPDATE_CRYPTOS",
  SELECT_LOCAL_CURRENCY = "SELECT_LOCAL_CURRENCY"
}

export function updateCryptos(cryptos: Crypto[]) {
    return action(actionTypes.UPDATE_CRYPTOS, {
        cryptos
    });
}

export function selectLocalCurrency(countryCodes: Iso[]) {
    return action(actionTypes.SELECT_LOCAL_CURRENCY, {
      countryCodes
    });
}
