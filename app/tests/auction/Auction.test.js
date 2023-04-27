/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import 'whatwg-fetch';
import { AuthProvider } from '../../context/authContext';
import AuctionList from '../../pages/auctions/index';
import AuctionCreate from '../../pages/auctions/new';

describe("<AuctionCreate>", () => {
  it("Should render the AuctionCar", async () => {
    render(
      <AuthProvider>
        <AuctionCreate />
      </AuthProvider>);
    expect(await screen?.getAllByText('restricted')).exist;
  });
});

describe("<AuctionList>", () => {
  it("Should render the AuctionList", async () => {
    render(
      <AuthProvider>
        <AuctionList />
      </AuthProvider>);
    expect(await screen?.getAllByText('restricted')).exist;
  });
});