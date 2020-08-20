import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'raviger';
import { localCurrencies } from "./../constants";
import { selectLocalCurrency } from "./../actions";
import { Crypto } from "../types";

import styled from "styled-components";
import { device, colours } from "../styles/variables";

const StyledHeader = styled.div`
  height: 75px;
  margin: 0;
  padding: 0;
  width: 100%;

  a {
    color: inherit;
    display: inline-block;
    text-decoration: none;
  }

  img {
    height: 32px;
  }
`;

const StyledDropdown = styled.div`
    display: inline-block;
    margin: 0;
    padding: 0;
    position: absolute;
    right: 40px;
    top: 20px;
`;

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
      const crypto = Object.values(cryptos).find(c => c.name.toLowerCase() === selectedCryptoName);
      return typeof crypto === "undefined" ? { imageUrl: "./images/placeholder.png", name: "Error", fullName: "Error" } : crypto;
    }
    return { name: "Error", fullName: "Error" };
  }

  function selectCodeFromList(selected: string) {
    dispatch(selectLocalCurrency(selected))
  }

  return (<StyledHeader className="header" data-test="component-header">
    {selectedCryptoName.length ? (
      <div>
        <Link href="/">{"<--"}</Link>
        <img src={selectedCrypto().imageUrl} alt={selectedCrypto().fullName} />
        <h2>{selectedCrypto().fullName}</h2>
        <p>{selectedCrypto().name}</p>
      </div>) :
      <Link href="/"><h1>VFCRYPTO</h1></Link>
    }

    <StyledDropdown data-test="component-local-currency-dropdown">{localCurrencies.map((currency: string, index: any) =>
      <div onClick={() => selectCodeFromList(currency)} key={currency}>{currency}</div>)}
    </StyledDropdown>
  </StyledHeader>)
}
export default connect(mapStateToProps)(Header);
