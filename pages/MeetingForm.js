import React from "react";

const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

const formatTime = (date) => {
  var d = new Date(date)
  var hours = d.getHours();
  var minutes = d.getMinutes();
  if (minutes.toString().length < 2)
    minutes = '0' + minutes
  return `${hours}:${minutes}`
}

export class MeetingForm extends React.Component {
  state = {
    who: 'Devin',
    meetingTitle: '',
    meetingDate: formatDate(Date.now()),
    meetingTime: formatTime(Date.now()),
    meetingUrl: ''
  };
  handleInputChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    this.props.addMeeting(this.state);
    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Meeting Title:
            <input
            name="meetingTitle"
            type="text"
            value={this.state.meetingTitle}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Who:
            <select name="who" onChange={this.handleInputChange}>
            <option value="Devin">Devin</option>
            <option value="Allison">Allison</option>
          </select>
        </label>
        <br />
        <label>
          Meeting date:
            <input
            name="meetingDate"
            type="date"
            value={this.state.meetingDate}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Meeting time:
            <input
            name="meetingTime"
            type="time"
            value={this.state.meetingTime}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Meeting url:
            <input
            name="meetingUrl"
            type="text"
            value={this.state.meetingUrl}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default MeetingForm;