import { useState, useEffect, memo } from "react";

const ASCII_ENDPOINT = "https://api.github.com/octocat";

async function fetchAscii(text) {
  const res = await fetch(`${ASCII_ENDPOINT}?s=${encodeURIComponent(text)}`);
  return res.text();
}

function buildMessage({ who, meetingTitle, meetingDate, meetingTime }) {
  const diff = Math.abs(new Date(`${meetingDate}T${meetingTime}`) - Date.now());
  const mins = Math.floor(diff / 60000);
  const timeLabel = mins > 59 ? `${Math.floor(mins / 60)} hours` : `${mins} minutes`;
  return `${who} has a meeting called ${meetingTitle} coming up in ${timeLabel}`;
}

function MonalisaMessage({ messageData }) {
  const [asciiArt, setAsciiArt] = useState('');

  useEffect(() => {
    if (!messageData) return;
    const safe = buildMessage(messageData).replace(/[^\w\s]/gi, '');
    fetchAscii(safe).then(setAsciiArt);
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

export default memo(MonalisaMessage);
