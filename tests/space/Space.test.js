/**
 * @jest-environment jsdom
 */

import { AuthProvider } from '@/context/authContext';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import 'whatwg-fetch';
import SpaceCreate from '../../pages/adspaces/new';

describe("<SpaceCreate>", () => {
  it("Should render the SpaceCreate", async () => {
    render(
      <AuthProvider>
        <SpaceCreate />
      </AuthProvider>);
    expect(await screen?.getByText('restricted')).exist;
  });
});