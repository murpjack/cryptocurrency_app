import React from 'react';
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import { render } from '@testing-library/react';
import App from './App';

Enzyme.configure({adapter: new EnzymeAdapter()})

test('renders without error', () => {
  const wrapper = shallow(<App/>);
  const appComponent = wrapper.find("[data-test='component-app']")
  expect(appComponent.length).toBe(1);
});

test('renders header content', () => {
});

test('renders local currency dropdown', () => {
});

test('selected local currency starts as USD', () => {
});

test('clicking local currency from list displays new selected currency', () => {
});

// All Cryptocurrencies page
test('clicking cryptocurrency from list displays new page', () => {
});

test('renders cryptocurrency list', () => {
});

test('each visible cryptocurrency in list shows data', () => {
});

// single Cryptocurrency page
test('cryptocurrency data shows correctly', () => {
});
