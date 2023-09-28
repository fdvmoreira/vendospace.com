/**
 * @jest-environment jsdom
 */

import { AuthProvider } from '@/context/authContext';
import ListingList from '@/pages/listings/index';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import 'whatwg-fetch';

describe("<ListingList>", () => {
  it("Should render the ListingList", async () => {
    render(
      <AuthProvider>
        <ListingList />
      </AuthProvider>);
    expect(await screen?.getAllByText('restricted')).exist;
  });
});