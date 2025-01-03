import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('validates the MeetingForm component', () => {
    render(<Home />);
    const meetingForm = screen.getByRole('form');
    const submitButton = screen.getByText(/Submit/i);

    fireEvent.change(screen.getByLabelText(/Meeting Title/i), { target: { value: '' } });
    fireEvent.submit(meetingForm);
    expect(screen.getByText(/Meeting Title is required/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Meeting Title/i), { target: { value: 'Test Meeting' } });
    fireEvent.submit(meetingForm);
    expect(screen.queryByText(/Meeting Title is required/i)).not.toBeInTheDocument();
  });

  it('handles an empty MeetingsList component', () => {
    render(<Home />);
    const meetingsList = screen.getByRole('table');
    expect(meetingsList).toBeEmptyDOMElement();
  });

  it('handles adding a new meeting in Home component', () => {
    render(<Home />);
    const meetingForm = screen.getByRole('form');
    const submitButton = screen.getByText(/Submit/i);

    fireEvent.change(screen.getByLabelText(/Meeting Title/i), { target: { value: 'New Meeting' } });
    fireEvent.change(screen.getByLabelText(/Who/i), { target: { value: 'Allison' } });
    fireEvent.change(screen.getByLabelText(/Meeting date/i), { target: { value: '2022-12-31' } });
    fireEvent.change(screen.getByLabelText(/Meeting time/i), { target: { value: '12:00' } });
    fireEvent.change(screen.getByLabelText(/Meeting url/i), { target: { value: 'https://example.com' } });

    fireEvent.submit(meetingForm);

    const newMeeting = screen.getByText(/Allison has a meeting called New Meeting coming up on 2022-12-31 at 12:00/i);
    expect(newMeeting).toBeInTheDocument();
  });
});
