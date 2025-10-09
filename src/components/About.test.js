
import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About Component', () => {
  test('renders main title', () => {
    render(<About />);
    const mainTitle = screen.getByText(/about our matchmaking portal/i);
    expect(mainTitle).toBeInTheDocument();
  });

  test('renders "Why Marriage is Important" section', () => {
    render(<About />);
    const heading = screen.getByText(/why marriage is important/i);
    expect(heading).toBeInTheDocument();

    const paragraph = screen.getByText(/marriage is one of the most significant milestones/i);
    expect(paragraph).toBeInTheDocument();
  });

  test('renders "How Our Website Finds Your Perfect Match" section', () => {
    render(<About />);
    const heading = screen.getByText(/how our website finds your perfect match/i);
    expect(heading).toBeInTheDocument();

    const paragraph1 = screen.getByText(/our matchmaking portal integrates traditional indian astrology/i);
    const paragraph2 = screen.getByText(/we combine this ancient wisdom/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
});
