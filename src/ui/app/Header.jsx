'use strict'
const React = require('react')
const { Link } = require('react-router-dom')
const { withRouter } = require('react-router')

const t = {
  header: {
    title: 'Field Data Coordinator',
    data: 'Data',
    survey: 'Surveys',
    about: 'About'
  }
}

class Header extends React.Component {
  activeClass (match) {
    const { pathname } = this.props.location
    return pathname.slice(0, match.length) === match ? 'navItemLink header__active' : 'navItemLink'
  }

  render () {
    return (
      <header className='header'>
        <div className='row'>
          <nav role='navigation'>
            <ul>
              <li className='navItem navItemHome'>
                <Link to='/home' className={this.activeClass('/home')}>
                  <h1 className='header__title navItemLink'><img alt='Observe Coordinator' className='logo-main' src='./assets/icons/observe-coordinator-logo.png' /></h1>
                </Link>
              </li>
              <li className='navItem'>
                <Link to='/data' className={this.activeClass('/data')}>
                  {t.header.data}
                </Link>
              </li>
              <li className='navItem'>
                <Link to='/surveys' className={this.activeClass('/surveys')}>
                  {t.header.survey}
                </Link>
              </li>
              <li className='navItem'>
                <Link to='/about' className={this.activeClass('/about')}>
                  {t.header.about}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}
module.exports = withRouter(Header)
