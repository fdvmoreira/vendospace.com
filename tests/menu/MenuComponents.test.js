/**
 * @jest-environment jsdom
 */

import ActionMenu from '@/components/menus/ActionMenu';
import { AuthProvider } from '@/context/authContext';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import 'whatwg-fetch';

describe("<ActionMenu>", () => {
  it("Should render the ActionMenu", async () => {
    render(
      <AuthProvider>
        <ActionMenu />
      </AuthProvider>);
    expect(await screen?.getByText('Create new')).exist;
  });
});