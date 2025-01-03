import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../index';

describe('Home', () => {
  it('renders the heading', () => {
    render(<Home />);
    const heading = screen.getByText(/Tracking our virtual meetings!/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders the MeetingForm component', () => {
    render(<Home />);
    const meetingForm = screen.getByRole('form');
    expect(meetingForm).toBeInTheDocument();
  });

  it('renders the MeetingsList component', () => {
    render(<Home />);
    const meetingsList = screen.getByRole('table');
    expect(meetingsList).toBeInTheDocument();
  });
});
