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
  Reference: string;
  Name: string;
  FullName: string;
  MarketCap: string;
  CirculatingSupply: string;
  Price: string;
  Volume24Hour: number;
  ChangePCT24Hour: string;
}

export interface AppState {
  cryptos: Crypto[] | [];
  selectedCurrency: string;
  cryptoRequestState: Status;
  cryptoRequestFailure: string;
}
