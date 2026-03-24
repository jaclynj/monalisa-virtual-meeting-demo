import React, { useState, useEffect } from 'react';
import { Meeting } from '../types/meeting';
import { getMonaMessage } from '../lib/meetings';
import styles from '../styles/MonalisaMessage.module.css';

const ASCII_ENDPOINT = 'https://api.github.com/octocat';

const fetchAsciiArt = async (message: string): Promise<string> => {
  try {
    const response = await fetch(
      `${ASCII_ENDPOINT}?s=${encodeURIComponent(message)}`
    );
    return response.text();
  } catch {
    return '';
  }
};

interface MonalisaMessageProps {
  messageData?: Meeting;
}

const MonalisaMessage: React.FC<MonalisaMessageProps> = ({ messageData }) => {
  const [asciiArt, setAsciiArt] = useState<string>('');

  useEffect(() => {
    if (!messageData) return;
    // The octocat endpoint only accepts alphanumeric characters and spaces.
    const message = getMonaMessage(messageData).replace(/[^\w\s]/gi, '');
    fetchAsciiArt(message).then(setAsciiArt);
  }, [messageData]);

  return <div className={styles.asciiArt}>{asciiArt}</div>;
};

export default React.memo(MonalisaMessage);
