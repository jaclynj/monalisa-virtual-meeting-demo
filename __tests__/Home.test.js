import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/index';

describe('Home', () => {
  test('renders Zoom Meeting Tracker title', () => {
    render(<Home />);
    const titleElement = screen.getByText(/Tracking our virtual meetings!/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders MeetingForm component', () => {
    render(<Home />);
    const meetingFormElement = screen.getByText(/Meeting Title:/i);
    expect(meetingFormElement).toBeInTheDocument();
  });

  test('renders MeetingsList component', () => {
    render(<Home />);
    const meetingsListElement = screen.getByText(/Meeting Link/i);
    expect(meetingsListElement).toBeInTheDocument();
  });
});
