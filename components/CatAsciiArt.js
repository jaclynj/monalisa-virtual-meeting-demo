import React from 'react';

const CatAsciiArt = () => {
  const catArt = `
    /\\_/\\  
   (  o.o  )
    > ^ <
  `;

  return (
    <div className="cat-ascii">
      <pre>{catArt}</pre>
      <style jsx>{`
        .cat-ascii {
          font-family: monospace;
          text-align: center;
          margin: 20px 0;
          color: #666;
        }
        .cat-ascii pre {
          margin: 0;
          font-size: 14px;
          line-height: 1.2;
        }
      `}</style>
    </div>
  );
};

export default CatAsciiArt;