/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import { useRouter } from 'next/router';
import 'whatwg-fetch';
import { AuthProvider } from '../context/authContext';
import Register from '../pages/register';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe("<Register>", () => {
  it("Should render the Register", async () => {

    useRouter.mockImplementation(() => {
      let router = jest.fn();
      return router;
    });

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>);

    expect(await screen?.getByPlaceholderText('Email address')).exist;
  });
});