/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import 'whatwg-fetch';
import ActionMenu from '../../components/menus/ActionMenu';
import { AuthProvider } from '../../context/authContext';

describe("<ActionMenu>", () => {
  it("Should render the ActionMenu", async () => {
    render(
      <AuthProvider>
        <ActionMenu />
      </AuthProvider>);
    expect(await screen?.getByText('Create new')).exist;
  });
});