import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import * as actions from '../actions/authActions';

import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>
const RecipeNew = () => <h2>RecipeNew</h2>
const Landing = () => <h2>Landing</h2>

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
        <div className='container'>
          <BrowserRouter>
            <div>
              <Header />
              <Route exact={true} path ='/' component={Landing} />
              <Route exact={true} path ='/recipes' component={Dashboard} />
              <Route path ='/recipes/new' component={RecipeNew} />
            </div>
          </BrowserRouter>
        </div>
    );
  };
};

// function mapDispatchToProps (dispatch) {
//   return {
//     actions: bindActionCreators(actions, dispatch),
//   };
// }

export default connect(null, actions)(App);
