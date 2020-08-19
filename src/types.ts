import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type Actions = ActionType<typeof actions>;

export interface Iso {
  name: string,
  isSelected: boolean
}

export interface CurrencyProps {
  currency: Crypto
}

export interface Crypto {
      Status: string,
      IsSelected: boolean,
      Name: string,
      FullName: string,
      MarketCap: number,
      CirculatingSupply: number,
      Price: number,
      Volume24Hour: number,
      ChangePCT24Hour: number
}

export interface AppState {
    countryCodes: Iso[],
    cryptos: Crypto[]
}
