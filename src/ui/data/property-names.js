const { fullDate } = require('../format')

module.exports.accessors = {
  device: 'deviceId',
  survey: 'surveyId',
  surveyType: 'surveyType',
  observationId: 'id',
  version: '_version_id',
  p2pId: 'osm-p2p-id',
  timestamp: '_timestamp'
}

module.exports.tableHeaders = [
  'Username',
  'Device ID',
  'Survey ID',
  'Observation Type',
  'Date Submitted'
]

module.exports.tableRows = [
  'userName',
  'deviceId',
  'surveyId',
  'surveyType',
  (d) => fullDate(d._timestamp)
]

module.exports.filterItems = [
  ['Username', 'userName'],
  ['Device ID', 'deviceId'],
  ['Survey ID', 'surveyId'],
  ['Observation Type', 'surveyType']
]
