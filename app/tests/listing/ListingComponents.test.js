/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import 'whatwg-fetch';
import ListingCard from '../../components/listing/ListingCard';
import ListingItem from '../../components/listing/ListingItem';
import { AuthProvider } from '../../context/authContext';

const space = [{
  imagesURL: [],
  type: "post",
  address: "78 Willing Street",
  dimension: {
    width: 45,
    height: 45,
    unit: "cm",
  },
  location: {
    latitude: 1.4512,
    longitude: -1.454,
  }
}];

describe("<ListingCard>", () => {
  it("Should render the ListingCard", async () => {
    const date = new Date();
    render(
      <AuthProvider>
        <ListingCard listing={{ _id: 121, spaceId: date, user: "testing user" }} />
      </AuthProvider>);
    expect(await screen?.getAllByText('Dimensions:')).exist;
  });
});

describe("<ListingItem>", () => {
  it("Should render the ListingItem", async () => {
    render(
      <AuthProvider>
        <ListingItem />
      </AuthProvider>);
    expect(await screen?.getAllByText('Dimension:')).exist;
  });
});