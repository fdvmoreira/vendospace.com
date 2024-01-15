/**
 * @jest-environment jsdom
 */

import ListBidsModal from '@/components/bid/ListBidModal';
import NewBid from '@/components/bid/NewBid';
import { AuthProvider } from '@/context/authContext';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import 'whatwg-fetch';

describe("<ListBidsModal>", () => {
  it("Should render the ListBidsModal", async () => {
    render(
      <AuthProvider>
        <ListBidsModal />
      </AuthProvider>);
    expect(await screen?.getByText('No bids yet')).exist;
  });
});

describe("<NewBid>", () => {
  it("Should render the NewBid", async () => {
    render(
      <AuthProvider>
        <NewBid data={{ bidderId: "aaa", auctionId: "aaa" }} selectedAuction={"AAA"} />
      </AuthProvider>);
    expect(await screen?.findByText('Place your bid')).exist;
  });
});