'use strict'
const React = require('react')
const { connect } = require('react-redux')
const bboxPolygon = require('@turf/bbox-polygon')
const calculateArea = require('@turf/area')
const centroid = require('@turf/centroid')
const objectPath = require('object-path')
const Map = require('../map')

const selectedMapOptions = {
  interactive: false
}

// TODO decouple the select button from the current selection
class CurrentSelection extends React.Component {
  render () {
    const { loading, bounds } = this.props
    const center = !bounds ? null
    : objectPath.get(centroid(bboxPolygon(bounds)), 'geometry.coordinates', null)
    return (
      <div>
        { loading ? <p>Loading ...</p> : null }
        { bounds && !loading ? this.renderCurrentSelection(center) : null }
        { !bounds && !loading ? <p>No area selected</p> : null }
      </div>
    )
  }

  renderCurrentSelection (center) {
    const { bounds } = this.props
    return (
      <div className='selected'>
        <h3>Your current selection</h3>
        <Map
          options={selectedMapOptions}
          containerClass='selected__map'
          center={center}
          onInit={(map) => map.fitBounds(bounds)}
        />
        <p>Coordinates: {bounds.map(b => b.toFixed(5)).join(', ')}</p>
        <p>Area: {(calculateArea(bboxPolygon(bounds)) / 1000).toFixed(2)} km<sup>2</sup></p>
      </div>
    )
  }
}

const mapStateToProps = ({ osmBounds, loading }) => {
  return {
    loading,
    bounds: osmBounds.length ? osmBounds : null
  }
}

module.exports = connect(mapStateToProps)(CurrentSelection)
