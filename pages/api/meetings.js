import getMeetings from '../../meetingsHelper/getMeetings';

export default (req, res) => {
  const meetings = getMeetings();
  res.status(200).json(meetings);
}
