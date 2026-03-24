import React, { memo, useEffect, useState } from "react";
import { Meeting } from "../types/meeting";
import styles from "./MonalisaMessage.module.css";

interface Props {
  messageData: Meeting | undefined;
}

const ASCII_ENDPOINT = "https://api.github.com/octocat";

const getMonaMessage = ({
  who,
  meetingTitle,
  meetingDate,
  meetingTime,
}: Meeting): string => {
  const ms = Math.abs(
    new Date(`${meetingDate}T${meetingTime}`).getTime() - Date.now()
  );
  const minutesToGo = Math.floor(ms / 60000);
  const when =
    minutesToGo > 59
      ? `${Math.floor(minutesToGo / 60)} hours`
      : `${minutesToGo} minutes`;
  return `${who} has a meeting called ${meetingTitle} coming up in ${when}`;
};

async function fetchAsciiArt(message: string): Promise<string> {
  const clean = message.replace(/[^\w\s]/gi, "");
  const res = await fetch(
    `${ASCII_ENDPOINT}?s=${encodeURIComponent(clean)}`
  );
  return res.text();
}

function MonalisaMessage({ messageData }: Props) {
  const [asciiArt, setAsciiArt] = useState("");

  useEffect(() => {
    if (!messageData) {
      setAsciiArt("");
      return;
    }
    let cancelled = false;
    fetchAsciiArt(getMonaMessage(messageData)).then((art) => {
      if (!cancelled) setAsciiArt(art);
    });
    return () => {
      cancelled = true;
    };
  }, [messageData]);

  if (!asciiArt) return null;

  return <div className={styles.asciiArt}>{asciiArt}</div>;
}

export default memo(MonalisaMessage);
