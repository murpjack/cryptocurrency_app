import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'raviger';
import { localCurrencies } from "./../constants";
import { selectLocalCurrency } from "./../actions";
import { Crypto } from "../types";

const mapStateToProps = ({ app }: any) => ({
  cryptos: app.cryptos,
  selectedCurrency: app.selectedCurrency
})

interface HeaderProps {
  cryptos: Crypto[],
  selectedCurrency: string,
  dispatch: any
}

export const Header = ({ cryptos, selectedCurrency, dispatch }: HeaderProps) => {

  function selectCodeFromList(selected: string) {
    dispatch(selectLocalCurrency(selected))
  }

  return (<div className="header" data-test="component-header">
    {true ?
      <Link href="/"><h1>VFCRYPTO</h1></Link> :
      (<div>
        <Link href="/">{"<--"}</Link>
        <h2>{cryptos[0].FullName}</h2>
        <p>{cryptos[0].Name}</p>
      </div>)
    }

    <div data-test="component-local-currency-dropdown">{localCurrencies.map((currency: string, index: any) =>
      <div onClick={() => selectCodeFromList(currency)} key={currency}>{currency}</div>)}
    </div>
  </div>)
}
export default connect(mapStateToProps)(Header);
