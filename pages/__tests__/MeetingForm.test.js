import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MeetingForm } from '../MeetingForm';

describe('MeetingForm', () => {
  it('renders the form', () => {
    render(<MeetingForm addMeeting={() => {}} />);
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('submits the form with correct data', () => {
    const addMeeting = jest.fn();
    render(<MeetingForm addMeeting={addMeeting} />);

    fireEvent.change(screen.getByLabelText(/Meeting Title/i), { target: { value: 'Test Meeting' } });
    fireEvent.change(screen.getByLabelText(/Who/i), { target: { value: 'Allison' } });
    fireEvent.change(screen.getByLabelText(/Meeting date/i), { target: { value: '2022-12-31' } });
    fireEvent.change(screen.getByLabelText(/Meeting time/i), { target: { value: '12:00' } });
    fireEvent.change(screen.getByLabelText(/Meeting url/i), { target: { value: 'https://example.com' } });

    fireEvent.submit(screen.getByRole('form'));

    expect(addMeeting).toHaveBeenCalledWith({
      who: 'Allison',
      meetingTitle: 'Test Meeting',
      meetingDate: '2022-12-31',
      meetingTime: '12:00',
      meetingUrl: 'https://example.com'
    });
  });
});
