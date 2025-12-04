import React from "react";

const catAscii = `
     /\\_/\\  
    ( o.o ) 
     > ^ <
    /|   |\\
   (_|   |_)
`;

const dogAscii = `
    / \\__
   (    @\\___
   /         O
  /   (_____/
 /_____/   U
`;

export const AsciiArt = () => {
  return (
    <div className="ascii-container">
      <div className="ascii-item">
        <h3>Cat</h3>
        <pre>{catAscii}</pre>
      </div>
      <div className="ascii-item">
        <h3>Dog</h3>
        <pre>{dogAscii}</pre>
      </div>

      <style jsx>{`
        .ascii-container {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin: 20px 0;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .ascii-item {
          text-align: center;
        }
        .ascii-item h3 {
          margin-bottom: 10px;
          color: darkblue;
        }
        pre {
          font-family: monospace;
          font-size: 14px;
          line-height: 1.2;
          margin: 0;
          color: darkblue;
        }
      `}</style>
    </div>
  );
};
