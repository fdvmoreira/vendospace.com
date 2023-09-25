/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import 'whatwg-fetch';
import SpaceCard from '../../components/space/SpaceCard';
import SpaceManager from '../../components/space/SpaceManager';
import { AuthProvider } from '../../context/authContext';

describe("<SpaceManager>", () => {
  it("Should render the SpaceManager", async () => {
    render(
      <AuthProvider>
        <SpaceManager />
      </AuthProvider>);
    expect(await screen?.getByText('Select ad space type')).exist;
  });
});

describe("<SpaceCard>", () => {
  it("Should render the SpaceCard", async () => {
    render(
      <AuthProvider>
        <SpaceCard />
      </AuthProvider>);
    expect(await screen?.getByText('Dimensions:')).exist;
  });
});