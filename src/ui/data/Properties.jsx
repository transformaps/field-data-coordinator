'use strict'
const React = require('react')
const { connect } = require('react-redux')
const immutable = require('immutable')
const PropTypes = require('prop-types')
const { getFlattenedProperties } = require('../../selectors')
const DatePicker = require('react-datepicker').default
const moment = require('moment')
const { toggleFilterProperty, clearFilterProperties } = require('../../actions')

class Properties extends React.Component {
  constructor (props) {
    super(props)
    this.toggleFilterProperty = this.toggleFilterProperty.bind(this)
    this.clearFilterProperties = this.clearFilterProperties.bind(this)
    const timestamps = this.getSortedTimestamps()
    this.state = {
      startDate: timestamps[0],
      endDate: timestamps[timestamps.length - 1]
    }
  }

  clearFilterProperties () {
    this.props.dispatch(clearFilterProperties())
  }

  componentWillMount () {
    this.clearFilterProperties()
  }

  getSortedTimestamps () {
    const { properties } = this.props
    if (!properties._timestamp) return []
    return Object.keys(properties._timestamp).map(t => parseInt(t, 10)).sort()
  }

  render () {
    const { properties } = this.props
    const timestamps = this.getSortedTimestamps()
    return (
      <aside role='complementary' className='sidebar'>
        <h4>Filter</h4>
        <a className='filterClear' onClick={this.clearFilterProperties}>Clear All</a>
        {timestamps.length ? this.renderTimeRange(timestamps) : null}
        {Object.keys(properties).map(name => {
          if (name === '_timestamp') return null
          return this.renderProperty(name, properties[name])
        })}
      </aside>
    )
  }

  renderProperty (name, responses) {
    let activeProperty = this.props.activeProperties.get(name)
    return (
      <fieldset className='property' key={name}>
        <legend htmlFor={`{name}-responses`}>{name}</legend>
        <ul className='filters' id={`${name}-responses`}>
          {Object.keys(responses).map(response => (
            <li key={response} className='filterWrapper clearfix'>
              <input type='checkbox'
                className='checkbox'
                id={'checkbox--' + response}
                checked={activeProperty === response}
                onClick={() => this.toggleFilterProperty(name, response)} />
              <label htmlFor={'checkbox--' + response}>{`${response} (${responses[response]})`}</label>
            </li>
          ))}
        </ul>
      </fieldset>
    )
  }

  renderTimeRange (timestamps) {
    const { startDate, endDate } = this.state
    return (
      <div className='timeRanges'>
        Start: <DatePicker
          minDate={moment(timestamps[0])}
          maxDate={moment(timestamps[timestamps.length - 1])}
          selected={moment(startDate)}
          selectsStart
        />
        End: <DatePicker
          minDate={moment(timestamps[0])}
          maxDate={moment(timestamps[timestamps.length - 1])}
          selected={moment(endDate)}
          selectsEnd
        />
      </div>
    )
  }

  toggleFilterProperty (name, response) {
    this.props.dispatch(toggleFilterProperty({ k: name, v: response }))
  }
}

Properties.propTypes = {
  // immutable list of all observation ids
  observations: PropTypes.instanceOf(immutable.List),
  // object containing feature property names and their count
  properties: PropTypes.object,
  // currently active properties
  activeProperties: PropTypes.instanceOf(immutable.Map),
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    observations: state.observations.get('all'),
    properties: getFlattenedProperties(state),
    activeProperties: state.observations.get('filterProperties')
  }
}
module.exports = connect(mapStateToProps)(Properties)
