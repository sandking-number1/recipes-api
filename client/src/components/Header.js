import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

  renderContent() {
    // eslint-disable-next-line
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href='/auth/google'>{`Login With Google`}</a></li>;
      default:
        return (
          <li>
            <a href='/api/logout'>{`Logout`}</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
          // eslint-disable-next-line
            to={this.props.auth ? '/recipes' : '/'}
            className='left brand-logo'>
            {`Recipe Manager`}
          </Link>
          <ul className='right'>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
