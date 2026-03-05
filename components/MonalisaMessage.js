import React, { useState, useEffect } from "react";

const ASCII_ENDPOINT = "https://api.github.com/octocat";

const fetchAscii = async (text) => {
  const res = await fetch(`${ASCII_ENDPOINT}?s=${encodeURIComponent(text)}`);
  return res.text();
};

const buildMessage = ({ who, meetingTitle, meetingDate, meetingTime }) => {
  const ms = Math.abs(new Date(`${meetingDate}T${meetingTime}`) - Date.now());
  const mins = Math.floor(ms / 60000);
  const when = mins > 59 ? `${Math.floor(mins / 60)} hours` : `${mins} minutes`;
  return `${who} has a meeting called ${meetingTitle} coming up in ${when}`;
};

function MonalisaMessage({ messageData }) {
  const [asciiArt, setAsciiArt] = useState("");

  useEffect(() => {
    if (!messageData) return;
    fetchAscii(buildMessage(messageData).replace(/[^\w\s]/gi, ""))
      .then((art) => setAsciiArt(art));
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
