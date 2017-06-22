'use strict'
const React = require('react')
const FlatButton = require('material-ui/FlatButton').default
const { Link } = require('react-router-dom')

const t = {
  header: {
    title: 'Field Data Coordinator',
    data: 'Data',
    survey: 'Surveys',
    about: 'About'
  }
}

module.exports = class Header extends React.Component {
  render () {
    return (
      <header className='header'>
        <nav role='navigation'>
          <Link to='/home'><h1 className='header__title'>{t.header.title}</h1></Link>
          <Link to='/data'><FlatButton label={t.header.data} /></Link>
          <Link to='/surveys'><FlatButton label={t.header.survey} /></Link>
          <FlatButton label={t.header.about} />
        </nav>
      </header>
    )
  }
}