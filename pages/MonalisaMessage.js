import React, { useState, FunctionComponent } from "react";


const ASCII_ENDPOINT = "https://api.github.com/octocat";

const getData = async (string) => {
  const response = await fetch(
    `${ASCII_ENDPOINT}?s=${encodeURIComponent(string)}`
  );
  return response.text();
};

export const AsciiArt = () => {
  const [inputMsg, setInputMsg] = useState("");
  const [asciiArt, setAsciiArt] = useState("");

  const onSubmit = async () => {
    const asciiArt = await getData(inputMsg);
    setAsciiArt(asciiArt);
  };

  return (
    <>
      {/* <input
        name="input-val"
        onChange={event => setInputMsg(event?.target?.value)}
      /> */}
      <p>When is the next meeting?</p>
      <button onClick={onSubmit}>Submit</button>
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
};