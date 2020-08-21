import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { Status } from "./constants";

export type Actions = ActionType<typeof actions>;

export interface Iso {
  name: string;
  isSelected: boolean;
}

export interface CurrencyProps {
  currency: Crypto;
}

export interface Crypto {
  rank: number;
  reference: string;
  name: string;
  fullName: string;
  marketCap: string | number;
  circulatingSupply: string | number;
  price: string | number;
  volume24Hour: string | number;
  changePCT24Hour: string;
  imageUrl: string;
}

export interface AppState {
  cryptos: Crypto[] | [];
  selectedCurrency: string;
  cryptoRequestState: Status;
  cryptoRequestFailure: string;
}
