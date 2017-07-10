'use strict'
const React = require('react')
const ObservationMap = require('./Observation-Map.jsx')
const ObservationTable = require('./Observation-Table.jsx')
const Properties = require('./Properties.jsx')
const Export = require('./Export.jsx')

class Observations extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeView: 'map'
    }
  }

  render () {
    const { activeView } = this.state
    return (
      <div className='content'>
        <Properties />
        <div className='contentMain'>
          <div className='clearfix'>
            <h2 className='floatElementLeft'>Data</h2>
            <Export />
          </div>
          <ul className='navTabs'>
            <li className='navTabsElement'>
              <span
                className={activeView === 'map' ? 'active' : null}
                onClick={() => this.setState({ activeView: 'map' })}
                >Map</span>
            </li>
            <li className='navTabsElement'>
              <span
                className={activeView === 'table' ? 'active' : null}
                onClick={() => this.setState({ activeView: 'table' })}
                >Table</span>
            </li>
          </ul>
          { activeView === 'map' ? <ObservationMap /> : <ObservationTable /> }
        </div>
      </div>
    )
  }
}

module.exports = Observations
