import React from 'react';
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import { render } from '@testing-library/react';
import App from './App';
import Header from './components/Header';

/**
  * Creates a shallow app component
  * @function setup
  * @param {object} props - Component props specific to setup.
  * @param {any} state - Initial state for setup.
  * @returns {ShallowWrapper}
*/
export const setup = (props = {}, state = null) => {
  return shallow(<App {...props} />)
}
/**
  * Return ShallowWrapper containing node(s) with given data-test value.
  * @function findTestByAttr
  * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search inside.
  * @param {string} val - Value of data-test attribute for search.
  * @returns {ShallowWrapper}
*/
export const findTestByAttr = (wrapper,val) => {
  return wrapper.find(`[data-test="${val}"]`)
}


Enzyme.configure({ adapter: new EnzymeAdapter() })

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findTestByAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

// TODO
// test('renders header content', () => {
//   const wrapper = shallow(<Header />);
//   console.log(111, wrapper);
//
//   const headerComponent = findTestByAttr(wrapper, "component-header");
//   expect(headerComponent.length).toBe(1);
// });

// test('renders local currency dropdown', () => {
//   const wrapper = setup();
//   const dropdownComponent = findTestByAttr(wrapper, "component-local-currency-dropdown");
//   expect(dropdownComponent.length).toBe(1);
// });

// test('selected local currency starts as USD', () => {
//   const wrapper = setup();
//   const initialSelectedCurrency = wrapper.state("countryCodes");
//
// });

// test('clicking local currency from list displays new selected currency', () => {
// });


// test('clicking cryptocurrency from list displays new page', () => {
// });

// test('renders valid page from router', () => {
//   const wrapper = setup();
//   const listComponent = findTestByAttr(wrapper, "component-cryptos-list");
//   const singleCurrencyComponent = findTestByAttr(wrapper, "component-crypto");
//   expect(listComponent.length).toBe(1);
//   expect(singleCurrencyComponent.length).toBe(1);
// });

// test('each visible cryptocurrency in list shows data', () => {
// });
