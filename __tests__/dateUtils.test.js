const { formatDate, formatTime } = require('../utils/dateUtils');

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format a date to YYYY-MM-DD format', () => {
      const date = new Date('2020-05-10T14:30:00');
      const result = formatDate(date);
      expect(result).toBe('2020-05-10');
    });

    it('should pad single digit months with zero', () => {
      const date = new Date('2020-01-15T10:00:00');
      const result = formatDate(date);
      expect(result).toBe('2020-01-15');
    });

    it('should pad single digit days with zero', () => {
      const date = new Date('2020-12-05T10:00:00');
      const result = formatDate(date);
      expect(result).toBe('2020-12-05');
    });

    it('should handle both single digits', () => {
      const date = new Date('2020-01-05T10:00:00');
      const result = formatDate(date);
      expect(result).toBe('2020-01-05');
    });

    it('should handle timestamp input', () => {
      const timestamp = 1589115000000; // May 10, 2020 15:30:00 GMT
      const result = formatDate(timestamp);
      expect(result).toMatch(/^2020-05-10$/);
    });

    it('should handle string date input', () => {
      const result = formatDate('2020-05-10T14:30:00');
      expect(result).toBe('2020-05-10');
    });

    it('should handle edge case: last day of year', () => {
      const date = new Date('2020-12-31T23:59:59');
      const result = formatDate(date);
      expect(result).toBe('2020-12-31');
    });

    it('should handle edge case: first day of year', () => {
      const date = new Date('2020-01-01T00:00:00');
      const result = formatDate(date);
      expect(result).toBe('2020-01-01');
    });

    it('should handle leap year February', () => {
      const date = new Date('2020-02-29T12:00:00');
      const result = formatDate(date);
      expect(result).toBe('2020-02-29');
    });
  });

  describe('formatTime', () => {
    it('should format time to HH:MM format', () => {
      const date = new Date('2020-05-10T14:30:00');
      const result = formatTime(date);
      expect(result).toBe('14:30');
    });

    it('should pad single digit hours with zero', () => {
      const date = new Date('2020-05-10T09:30:00');
      const result = formatTime(date);
      expect(result).toBe('09:30');
    });

    it('should pad single digit minutes with zero', () => {
      const date = new Date('2020-05-10T14:05:00');
      const result = formatTime(date);
      expect(result).toBe('14:05');
    });

    it('should handle both single digits', () => {
      const date = new Date('2020-05-10T09:05:00');
      const result = formatTime(date);
      expect(result).toBe('09:05');
    });

    it('should handle midnight', () => {
      const date = new Date('2020-05-10T00:00:00');
      const result = formatTime(date);
      expect(result).toBe('00:00');
    });

    it('should handle noon', () => {
      const date = new Date('2020-05-10T12:00:00');
      const result = formatTime(date);
      expect(result).toBe('12:00');
    });

    it('should handle end of day', () => {
      const date = new Date('2020-05-10T23:59:00');
      const result = formatTime(date);
      expect(result).toBe('23:59');
    });

    it('should handle timestamp input', () => {
      const timestamp = 1589115000000; // May 10, 2020 15:30:00 GMT
      const result = formatTime(timestamp);
      // Note: This might vary based on timezone, but should be a valid time format
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('should handle string date input', () => {
      const result = formatTime('2020-05-10T14:30:00');
      expect(result).toBe('14:30');
    });

    it('should handle seconds being ignored', () => {
      const date = new Date('2020-05-10T14:30:45');
      const result = formatTime(date);
      expect(result).toBe('14:30');
    });

    it('should handle milliseconds being ignored', () => {
      const date = new Date('2020-05-10T14:30:45.123');
      const result = formatTime(date);
      expect(result).toBe('14:30');
    });
  });
});