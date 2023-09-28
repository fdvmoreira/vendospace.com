/**
 * @jest-environment jsdom
 */

import { AuthProvider } from '@/context/authContext';
import AuctionList from '@/pages/auctions/index';
import AuctionCreate from '@/pages/auctions/new';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import 'whatwg-fetch';

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