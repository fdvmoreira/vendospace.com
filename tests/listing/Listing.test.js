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
import ListingList from '../../pages/listings/index';

describe("<ListingList>", () => {
  it("Should render the ListingList", async () => {
    render(
      <AuthProvider>
        <ListingList />
      </AuthProvider>);
    expect(await screen?.getAllByText('restricted')).exist;
  });
});