import React from "react";

const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

const formatTime = (date) => {
  const d = new Date(date)
  let hours = d.getHours();
  let minutes = d.getMinutes();
  if (minutes.toString().length < 2)
    minutes = '0' + minutes
  if (hours.toString().length < 2)
    hours = '0' + hours
  return `${hours}:${minutes}`
}

export class MeetingForm extends React.Component {
  state = {
    who: 'Devin',
    meetingTitle: '',
    meetingDate: formatDate(Date.now()),
    meetingTime: formatTime(Date.now() + 3600000),
    description: ''
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
      <>
      <div className="meeting-form">
        <h2>New meeting</h2>
        <form className="box" onSubmit={this.handleSubmit} >
          <label>
          <span className="label">Title</span>
              <input
              name="meetingTitle"
              type="text"
              placeholder="Music time"
              value={this.state.meetingTitle}
              onChange={this.handleInputChange} />
          </label>
          <label>
            <span className="label">Who</span>
              <select name="who" onChange={this.handleInputChange}>
              <option value="Devin">Devin</option>
              <option value="Allison">Allison</option>
            </select>
          </label>
          <label>
          <span className="label">Date</span>
              <input
              name="meetingDate"
              type="date"
              value={this.state.meetingDate}
              onChange={this.handleInputChange} />
          </label>
          <label>
          <span className="label">Time</span>
              <input
              name="meetingTime"
              type="time"
              value={this.state.meetingTime}
              onChange={this.handleInputChange} />
          </label>
          <label>
            <span className="label">Description</span>
              <input
              name="description"
              placeholder="Learn how to make your own didgeridoo"
              type="text"
              value={this.state.description}
              onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Create + generate URL" />
        </form>
      </div>
    </>
    );
  }
}

export default MeetingForm;