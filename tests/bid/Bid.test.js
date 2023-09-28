/**
 * @jest-environment jsdom
 */

import { AuthProvider } from '@/context/authContext';
import ListBids from '@/pages/bids';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import 'whatwg-fetch';

describe("<ListBids>", () => {
  it("Should render the ListBids", async () => {
    render(
      <AuthProvider>
        <ListBids />
      </AuthProvider>);
    expect(await screen?.getByText('restricted')).exist;
  });
});