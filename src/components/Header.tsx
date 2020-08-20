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
`;

const StyledHeaderTitle = styled.div`
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;

  a {
    color: inherit;
    display: inline-block;
    text-decoration: none;
  }
  img {
    height: 32px;
    float: left;
    margin-left: 50px;
    padding: 22px 5px;
    margin-right: 5px;
    width: 32px;
  }

  .header__title {
    box-sizing: border-box;
    display: inline-block;
    height: 75px;
    padding: 15px 0;

    /* Back arrow */
    &:before {
      background-color: red;
      border-radius: 50px;
      content: "←";
      display: block;
      font-size: 25px;
      font-weight: 700;
      height: 32px;
      left: 15px;
      line-height: 28px;
      position: absolute;
      text-align: center;
      top: 22px;
      width: 32px;
    }
  }
  p {
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1px;
    margin: 0;
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

  return (<StyledHeader data-test="component-header">
    <StyledHeaderTitle>
      {selectedCryptoName.length ? (
        <Link href="/">
          <img src={selectedCrypto().imageUrl} alt={selectedCrypto().fullName} />
          <div className="header__title">
            <h2>{selectedCrypto().fullName}</h2>
            <p>{selectedCrypto().name}</p>
          </div>
        </Link>) :
        <Link href="/"><h1>VFCRYPTO</h1></Link>
      }
    </StyledHeaderTitle>

    <StyledDropdown data-test="component-local-currency-dropdown">{localCurrencies.map((currency: string, index: any) =>
      <div onClick={() => selectCodeFromList(currency)} key={currency}>{currency}</div>)}
    </StyledDropdown>
  </StyledHeader>)
}
export default connect(mapStateToProps)(Header);
