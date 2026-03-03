import React from "react";


const ASCII_ENDPOINT = "https://api.github.com/octocat";

const getData = async (string) => {
  const response = await fetch(
    `${ASCII_ENDPOINT}?s=${encodeURIComponent(string)}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch octocat message: ${response.status}`);
  }
  return response.text();
};

const getMonaMessage = ({ who, meetingTitle, meetingDate, meetingTime }) => {
  const ms = Math.abs(new Date(`${meetingDate}T${meetingTime}`) - Date.now());
  const minutesToGo = Math.floor(ms / 60000);

  const when = minutesToGo > 59 ? `${Math.floor(minutesToGo / 60)} hours` : `${minutesToGo} minutes`
  return `${who} has a meeting called ${meetingTitle} coming up in ${when}`
};

class MonalisaMessage extends React.Component {

  state = {
    asciiArt: '',
  }

  async componentDidMount() {
    if (this.props.messageData) {
      try {
        const asciiArt = await getData(getMonaMessage(this.props.messageData).replace(/[^\w\s]/gi, ''));
        this.setState({ asciiArt });
      } catch (e) {
        // silently ignore fetch errors for the ASCII art decoration
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.messageData !== prevProps.messageData) {
      try {
        // The octocat endpoint will only accept alphanumeric characters and spaces, so we strip out characters here.
        const asciiArt = await getData(getMonaMessage(this.props.messageData).replace(/[^\w\s]/gi, ''));
        this.setState({ asciiArt });
      } catch (e) {
        // silently ignore fetch errors for the ASCII art decoration
      }
    }
  }

  render() {
    return (
      <>
        <div className="ascii-art">{this.state.asciiArt}</div>

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

};

export default MonalisaMessage;