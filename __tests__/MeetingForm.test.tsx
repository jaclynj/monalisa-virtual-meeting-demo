import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import MeetingForm from '../components/MeetingForm';

describe('MeetingForm', () => {
  it('renders all form fields', () => {
    render(<MeetingForm addMeeting={jest.fn()} />);
    expect(screen.getByRole('textbox', { name: /meeting title/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /who/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /meeting url/i })).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<MeetingForm addMeeting={jest.fn()} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('pre-selects Devin in the who dropdown', () => {
    render(<MeetingForm addMeeting={jest.fn()} />);
    expect(screen.getByRole('combobox', { name: /who/i })).toHaveValue('Devin');
  });
});
