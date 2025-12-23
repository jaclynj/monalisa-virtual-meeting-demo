import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MeetingForm } from '../pages/MeetingForm';

describe('MeetingForm Component', () => {
  let mockAddMeeting;

  beforeEach(() => {
    mockAddMeeting = jest.fn();
  });

  test('renders form with all required fields', () => {
    render(<MeetingForm addMeeting={mockAddMeeting} />);
    
    // Check that all form fields are present
    expect(screen.getByLabelText(/Meeting Title:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Who:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Meeting date:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Meeting time:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Meeting url:/)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Submit')).toBeInTheDocument();
  });

  test('has default values set correctly', () => {
    render(<MeetingForm addMeeting={mockAddMeeting} />);
    
    // Check default values
    expect(screen.getByDisplayValue('Devin')).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument(); // meeting title should be empty
    
    // Date and time inputs should have current date/time defaults
    const dateInput = screen.getByDisplayValue(/\d{4}-\d{2}-\d{2}/);
    const timeInput = screen.getByDisplayValue(/\d{2}:\d{2}/);
    expect(dateInput).toBeInTheDocument();
    expect(timeInput).toBeInTheDocument();
  });

  test('updates form fields when user types', async () => {
    render(<MeetingForm addMeeting={mockAddMeeting} />);
    
    const titleInput = screen.getByLabelText(/Meeting Title:/);
    const urlInput = screen.getByLabelText(/Meeting url:/);
    
    fireEvent.change(titleInput, { target: { value: 'Test Meeting' } });
    fireEvent.change(urlInput, { target: { value: 'https://zoom.us/test' } });
    
    await waitFor(() => {
      expect(titleInput.value).toBe('Test Meeting');
      expect(urlInput.value).toBe('https://zoom.us/test');
    });
  });

  test('updates who selection when changed', async () => {
    render(<MeetingForm addMeeting={mockAddMeeting} />);
    
    const whoSelect = screen.getByLabelText(/Who:/);
    
    fireEvent.change(whoSelect, { target: { value: 'Allison' } });
    
    await waitFor(() => {
      expect(whoSelect.value).toBe('Allison');
    });
  });

  test('calls addMeeting with form data on submit', async () => {
    render(<MeetingForm addMeeting={mockAddMeeting} />);
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/Meeting Title:/), { 
      target: { value: 'Test Meeting' } 
    });
    fireEvent.change(screen.getByLabelText(/Meeting date:/), { 
      target: { value: '2024-12-25' } 
    });
    fireEvent.change(screen.getByLabelText(/Meeting time:/), { 
      target: { value: '15:30' } 
    });
    fireEvent.change(screen.getByLabelText(/Meeting url:/), { 
      target: { value: 'https://zoom.us/test' } 
    });
    
    // Submit form
    fireEvent.click(screen.getByDisplayValue('Submit'));
    
    await waitFor(() => {
      expect(mockAddMeeting).toHaveBeenCalledWith({
        who: 'Devin',
        meetingTitle: 'Test Meeting',
        meetingDate: '2024-12-25',
        meetingTime: '15:30',
        meetingUrl: 'https://zoom.us/test'
      });
    });
  });

  test('prevents default form submission', async () => {
    render(<MeetingForm addMeeting={mockAddMeeting} />);
    
    const form = screen.getByRole('form') || screen.getByTestId('meeting-form') || document.querySelector('form');
    const preventDefault = jest.fn();
    
    fireEvent.submit(form, { preventDefault });
    
    await waitFor(() => {
      expect(mockAddMeeting).toHaveBeenCalled();
    });
  });
});