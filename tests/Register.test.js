/**
 * @jest-environment jsdom
 */

import { AuthProvider } from '@/context/authContext';
import Register from '@/pages/register';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import { useRouter } from 'next/router';
import 'whatwg-fetch';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe("<Register>", () => {
  it("Should render the Registration page", async () => {

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