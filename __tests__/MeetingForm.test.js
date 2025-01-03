import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MeetingForm from '../pages/MeetingForm';

describe('MeetingForm', () => {
  test('renders MeetingForm component', () => {
    render(<MeetingForm addMeeting={() => {}} />);
    const meetingTitleElement = screen.getByLabelText(/Meeting Title:/i);
    expect(meetingTitleElement).toBeInTheDocument();
  });

  test('submits the form with correct data', () => {
    const addMeetingMock = jest.fn();
    render(<MeetingForm addMeeting={addMeetingMock} />);

    fireEvent.change(screen.getByLabelText(/Meeting Title:/i), { target: { value: 'Test Meeting' } });
    fireEvent.change(screen.getByLabelText(/Who:/i), { target: { value: 'Allison' } });
    fireEvent.change(screen.getByLabelText(/Meeting date:/i), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/Meeting time:/i), { target: { value: '12:00' } });
    fireEvent.change(screen.getByLabelText(/Meeting url:/i), { target: { value: 'https://example.com' } });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(addMeetingMock).toHaveBeenCalledWith({
      who: 'Allison',
      meetingTitle: 'Test Meeting',
      meetingDate: '2022-01-01',
      meetingTime: '12:00',
      meetingUrl: 'https://example.com'
    });
  });
});
