import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { Crypto, Iso } from "./types";

export function updateCryptos(cryptos: Crypto[]) {
    return action(Constants.UPDATE_CRYPTOS, {
        cryptos
    });
}

export function selectLocalCurrency(countryCodes: Iso[]) {
    return action(Constants.SELECT_LOCAL_CURRENCY, {
        countryCodes
    });
}
