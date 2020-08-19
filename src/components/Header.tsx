import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'raviger';
import { localCurrencies } from "./../constants";
import { updateCryptos, selectLocalCurrency } from "./../actions";
import { Crypto } from "../types";

const mapStateToProps = ({ app }: any) => ({
  cryptos: app.cryptos,
})

interface HeaderProps {
  cryptos: Crypto[],
  selectedCryptoName: string,
  dispatch: any
}

export const Header = ({ selectedCryptoName, cryptos, dispatch }: HeaderProps) => {

  const selectedCrypto = () => {
    if (selectedCryptoName) {
      const crypto = Object.values(cryptos).find(c => c.Name.toLowerCase() === selectedCryptoName);
      return typeof crypto === "undefined" ? { Name: "Error", FullName: "Error" } : crypto;
    }
    return { Name: "Error", FullName: "Error" };
  }

  function selectCodeFromList(selected: string) {
    dispatch(selectLocalCurrency(selected))
    // updateCryptos(selected);
  }

  return (<div className="header" data-test="component-header">
    {selectedCryptoName.length ? (
      <div>
        <Link href="/">{"<--"}</Link>
        <h2>{selectedCrypto().FullName}</h2>
        <p>{selectedCrypto().Name}</p>
      </div>) :
      <Link href="/"><h1>VFCRYPTO</h1></Link>
    }

    <div data-test="component-local-currency-dropdown">{localCurrencies.map((currency: string, index: any) =>
      <div onClick={() => selectCodeFromList(currency)} key={currency}>{currency}</div>)}
    </div>
  </div>)
}
export default connect(mapStateToProps)(Header);
