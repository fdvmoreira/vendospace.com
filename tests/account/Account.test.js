/**
 * @jest-environment jsdom
 */

import { AuthProvider } from '@/context/authContext';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import { useRouter } from 'next/router';
import 'whatwg-fetch';
import MyAccount from '@/pages/account/my';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe("<MyAccount>", () => {
  it("Should render the MyAccount", async () => {

    useRouter.mockImplementation(() => {
      let router = jest.fn();
      return router;
    });

    render(
      <AuthProvider>
        <MyAccount />
      </AuthProvider>);

    expect(await screen?.getByText('restricted')).exist;
  });
});