import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'raviger';

import { selectLocalCurrency } from "./../actions";
import { Iso, Crypto } from "../types";

const mapStateToProps = ({ app }: any) => ({
  cryptos: app.cryptos,
  countryCodes: app.countryCodes
})

interface HeaderProps {
  cryptos: Crypto[],
  countryCodes: Iso[],
  dispatch: any
}

export const Header = ({ cryptos, countryCodes, dispatch }: HeaderProps) => {

  function selectCodeFromList(selectedIndex: any) {
    const differentCode = countryCodes.findIndex(c => c.isSelected) !== selectedIndex;
    if (differentCode) {
      const updatedList =
        countryCodes.map((code: Iso, index: any) => {
          if (selectedIndex === index) {
            return { ...code, isSelected: true };
          }
          return { ...code, isSelected: false };
        });
      dispatch(selectLocalCurrency(updatedList))
    }
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

    <div data-test="component-local-currency-dropdown">{countryCodes.map((iso: Iso, index: any) =>
      <div onClick={() => selectCodeFromList(index)} key={iso.name}>{iso.name}</div>)}
    </div>
  </div>)
}
export default connect(mapStateToProps)(Header);
