/**
 * @jest-environment jsdom
 */

import AuctionCard from "@/components/auction/AuctionCard";
import AuctionForm from '@/components/auction/AuctionForm';
import AuctionItem from '@/components/auction/AuctionItem';
import { AuthProvider } from '@/context/authContext';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'whatwg-fetch';

describe("<AuctionCreate>", () => {
  it("Should render the AuctionCreate", async () => {
    render(
      <AuthProvider>
        <AuctionCard />
      </AuthProvider>);
    expect(await screen?.getAllByText('Ends')).exist;
  });
});

describe("<AuctionForm>", () => {
  it("Should render the AuctionForm", async () => {
    render(
      <AuthProvider>
        <AuctionForm />
      </AuthProvider>
    );
    expect(await screen?.getByText('-- select status --')).exist;
  });
});

describe("<AuctionItem>", () => {
  it("Should render the AuctionItem", async () => {
    render(
      <AuthProvider>
        <AuctionItem />
      </AuthProvider>);
    expect(await screen?.getByText('Dimensions:')).exist;
  });
});


