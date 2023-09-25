/**
 * @jest-environment jsdom
 */

import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/authContext';
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

describe("<Navbar>", () => {
  it("Should render the Navbar", async () => {

    useRouter.mockImplementation(() => {
      let router = jest.fn();
      return router;
    });

    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>);

    expect(await screen?.getByText('SignUp')).exist;
  });
});