/**
 * @jest-environment jsdom
 */

import { Footer } from "@/components/Footer";
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

describe("<Footer>", () => {
  it("Should render the Footer", async () => {

    useRouter.mockImplementation(() => {
      let router = jest.fn();
      return router;
    });

    render(
      <AuthProvider>
        <Footer />
      </AuthProvider>);

    expect(await screen?.getByText('FAQ')).exist;
  });
});