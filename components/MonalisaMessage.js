import React, { useState, useEffect } from "react";

const ASCII_ENDPOINT = "https://api.github.com/octocat";

const getData = async (string) => {
  const response = await fetch(
    `${ASCII_ENDPOINT}?s=${encodeURIComponent(string)}`
  );
  return response.text();
};

const getMonaMessage = ({ who, meetingTitle, meetingDate, meetingTime }) => {
  const ms = Math.abs(new Date(`${meetingDate}T${meetingTime}`) - Date.now());
  const minutesToGo = Math.floor(ms / 60000);

  const when = minutesToGo > 59 ? ` ${Math.floor(minutesToGo / 60)} hours` : `${minutesToGo} minutes`
  return `${who} has a meeting called ${meetingTitle} coming up in ${when}`
};

function MonalisaMessage({ messageData }) {
  const [asciiArt, setAsciiArt] = useState('');

  useEffect(() => {
    if (messageData) {
      const fetchAsciiArt = async () => {
        try {
          // The octocat endpoint will only accept alphanumeric characters and spaces, so we strip out characters here.
          const art = await getData(getMonaMessage(messageData).replace(/[^\w\s]/gi, ''));
          setAsciiArt(art);
        } catch (error) {
          console.error('Failed to fetch ASCII art:', error);
          setAsciiArt('');
        }
      };
      
      fetchAsciiArt();
    }
  }, [messageData]);

  return (
    <>
      <div className="ascii-art">{asciiArt}</div>

      <style jsx>{`
            .ascii-art {
              font-family: monospace;
              white-space: pre;
              text-align: left;
            }
          `}</style>
    </>
  );
}

export default React.memo(MonalisaMessage);