import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MeetingForm } from '../components/MeetingForm';

describe('MeetingForm', () => {
  test('renders all form fields', () => {
    const mockAddMeeting = jest.fn();
    render(<MeetingForm addMeeting={mockAddMeeting} />);
    
    expect(screen.getByLabelText(/meeting title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/who/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/meeting date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/meeting time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/meeting url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('calls addMeeting when form is submitted', () => {
    const mockAddMeeting = jest.fn();
    render(<MeetingForm addMeeting={mockAddMeeting} />);
    
    const titleInput = screen.getByLabelText(/meeting title/i);
    const urlInput = screen.getByLabelText(/meeting url/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.change(titleInput, { target: { value: 'Test Meeting' } });
    fireEvent.change(urlInput, { target: { value: 'https://test.zoom.us/j/123' } });
    fireEvent.click(submitButton);
    
    expect(mockAddMeeting).toHaveBeenCalledWith(
      expect.objectContaining({
        who: 'Devin',
        meetingTitle: 'Test Meeting',
        meetingUrl: 'https://test.zoom.us/j/123'
      })
    );
  });

  test('updates input values when changed', () => {
    const mockAddMeeting = jest.fn();
    render(<MeetingForm addMeeting={mockAddMeeting} />);
    
    const titleInput = screen.getByLabelText(/meeting title/i);
    fireEvent.change(titleInput, { target: { value: 'New Meeting Title' } });
    
    expect(titleInput.value).toBe('New Meeting Title');
  });
});