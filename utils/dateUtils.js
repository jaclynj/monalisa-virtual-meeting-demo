// Date and time formatting utilities

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
};

const formatTime = (date) => {
  const d = new Date(date)
  let hours = d.getHours();
  let minutes = d.getMinutes();
  if (minutes.toString().length < 2)
    minutes = '0' + minutes
  if (hours.toString().length < 2)
    hours = '0' + hours
  return `${hours}:${minutes}`
};

module.exports = {
  formatDate,
  formatTime
};