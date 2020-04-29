import React, { useState } from "react";
import { format, render, cancel, register } from 'timeago.js';

const ASCII_ENDPOINT = "https://api.github.com/octocat";

const getData = async (string) => {
  const response = await fetch(
    `${ASCII_ENDPOINT}?s=${encodeURIComponent(string)}`
  );
  return response.text();
};

const getMonaMessage = ({ who, meetingTitle, meetingDate, meetingTime }) => {
  const dateTime = Date.parse(meetingDate + " " + meetingTime)
  return `${who} has a meeting called ${meetingTitle} coming up ${format(dateTime)}`
};

class MonalisaMessage extends React.Component {

  state = {
    message: '',
    asciiArt: '',
  }

  async componentDidUpdate(prevProps) {
    if (this.props.messageData !== prevProps.messageData) {
      // The octocat endpoint will only accept alphanumeric characters and spaces, so we strip out characters here.
      const asciiArt = await getData(getMonaMessage(this.props.messageData).replace(/[^\w\s]/gi, ''));
      this.setState({ asciiArt });
    }
  }

  render() {
    return (
      <div className="cli">
        <h2>Download CLI <a href="https://github.com/cli/cli"><svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:"5px"}} fill="#0366D6" viewBox="0 0 16 16" width="16" height="16">  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.46967 10.7803C7.76256 11.0732 8.23744 11.0732 8.53033 10.7803L12.2803 7.03033C12.5732 6.73744 12.5732 6.26256 12.2803 5.96967C11.9874 5.67678 11.5126 5.67678 11.2197 5.96967L8.75 8.43934L8.75 1.75C8.75 1.33579 8.41421 1 8 1C7.58579 1 7.25 1.33579 7.25 1.75L7.25 8.43934L4.78033 5.96967C4.48744 5.67678 4.01256 5.67678 3.71967 5.96967C3.42678 6.26256 3.42678 6.73744 3.71967 7.03033L7.46967 10.7803ZM3.75 13.0001C3.33579 13.0001 3 13.3359 3 13.7501C3 14.1643 3.33579 14.5001 3.75 14.5001H12.25C12.6642 14.5001 13 14.1643 13 13.7501C13 13.3359 12.6642 13.0001 12.25 13.0001H3.75Z"></path></svg></a></h2>
        <div className="cli-example">$ mona next<br></br>
        
        {this.state.asciiArt}</div>
      </div>
    );
  }

};

export default React.memo(MonalisaMessage)