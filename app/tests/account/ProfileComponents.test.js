/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import 'chai';
import { expect } from 'chai';
import 'next/dist/server/base-http';
import 'whatwg-fetch';
import History from '../../components/profile/history/History';
import HistoryItemCard from '../../components/profile/history/HistoryItemCard';
import Message from '../../components/profile/message/Message';
import MessageCard from '../../components/profile/message/MessageCard';
import MessageReplyButton from '../../components/profile/message/MessageReplyButton';
import NewMessage from '../../components/profile/message/NewMessage';
import Profile from '../../components/profile/profile/Profile';
import { AuthProvider } from '../../context/authContext';

describe("<History>", () => {
  it("Should render the History", async () => {
    render(
      <AuthProvider>
        <History />
      </AuthProvider>);
    expect(await screen?.getByText('bids')).exist;
  });
});

describe("<HistoryItemCard>", () => {
  it("Should render the HistoryItemCard", async () => {
    render(
      <AuthProvider>
        <HistoryItemCard {...{ href: "", title: "AAAb", count: 0 }} />
      </AuthProvider>);
    expect(await screen?.getByText('AAAb')).exist;
  });
});

describe("<Profile>", () => {
  it("Should render the Profile", async () => {
    render(
      <AuthProvider>
        <Profile />
      </AuthProvider>);
    expect(await screen?.getByText('Name')).exist;
  });
});

describe("<MessageReplyButton>", () => {
  it("Should render the MessageReplyButton", async () => {
    render(
      <AuthProvider>
        <MessageReplyButton />
      </AuthProvider>);
    expect(await screen?.getByText('Reply')).exist;
  });
});

describe("<Message>", () => {
  it("Should render the Message", async () => {
    render(
      <AuthProvider>
        <Message />
      </AuthProvider>);
    expect(await screen?.getByText('No new messages')).exist;
  });
});

describe("<NewMessage>", () => {
  it("Should render the NewMessage", async () => {
    render(
      <AuthProvider>
        <NewMessage />
      </AuthProvider>);
    expect(await screen?.getByText('New Message')).exist;
  });
});

describe("<MessageCard>", () => {
  it("Should render the MessageCard", async () => {
    render(
      <AuthProvider>
        <MessageCard {...{ from: "A", subject: "AABBAA", message: "Hi", createdAt: null }} />
      </AuthProvider>);
    expect(await screen?.getByText('AABBAA')).exist;
  });
});

