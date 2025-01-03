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

  it('validates the form fields', () => {
    render(<MeetingForm addMeeting={() => {}} />);
    const form = screen.getByRole('form');

    fireEvent.change(screen.getByLabelText(/Meeting Title/i), { target: { value: '' } });
    fireEvent.submit(form);
    expect(screen.getByText(/Meeting Title is required/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Meeting Title/i), { target: { value: 'Test Meeting' } });
    fireEvent.submit(form);
    expect(screen.queryByText(/Meeting Title is required/i)).not.toBeInTheDocument();
  });

  it('handles form submission errors', () => {
    const addMeeting = jest.fn(() => {
      throw new Error('Form submission error');
    });
    render(<MeetingForm addMeeting={addMeeting} />);

    fireEvent.change(screen.getByLabelText(/Meeting Title/i), { target: { value: 'Test Meeting' } });
    fireEvent.change(screen.getByLabelText(/Who/i), { target: { value: 'Allison' } });
    fireEvent.change(screen.getByLabelText(/Meeting date/i), { target: { value: '2022-12-31' } });
    fireEvent.change(screen.getByLabelText(/Meeting time/i), { target: { value: '12:00' } });
    fireEvent.change(screen.getByLabelText(/Meeting url/i), { target: { value: 'https://example.com' } });

    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText(/Form submission error/i)).toBeInTheDocument();
  });
});
