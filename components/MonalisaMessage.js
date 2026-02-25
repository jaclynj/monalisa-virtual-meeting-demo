import React, { useState, useEffect } from "react";

const ASCII_ENDPOINT = "https://api.github.com/octocat";

const getData = async (string) => {
  const response = await fetch(
    `${ASCII_ENDPOINT}?s=${encodeURIComponent(string)}`
  );
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.text();
};

const getMonaMessage = ({ who, meetingTitle, meetingDate, meetingTime }) => {
  const ms = Math.abs(new Date(`${meetingDate}T${meetingTime}`) - Date.now());
  const minutesToGo = Math.floor(ms / 60000);
  const when =
    minutesToGo > 59
      ? `${Math.floor(minutesToGo / 60)} hours`
      : `${minutesToGo} minutes`;
  return `${who} has a meeting called ${meetingTitle} coming up in ${when}`;
};

function MonalisaMessage({ messageData }) {
  const [asciiArt, setAsciiArt] = useState("");

  useEffect(() => {
    if (!messageData) return;

    let cancelled = false;
    // The octocat endpoint will only accept alphanumeric characters and spaces, so we strip out characters here.
    const message = getMonaMessage(messageData).replace(/[^\w\s]/gi, "");
    getData(message)
      .then((art) => {
        if (!cancelled) setAsciiArt(art);
      })
      .catch(() => {
        // Silently ignore API errors (rate-limiting, network issues, etc.)
      });

    return () => {
      cancelled = true;
    };
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
