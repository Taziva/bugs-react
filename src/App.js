var React = require('react');
var ReactDOM = require('react-dom');
var BugList = require('./BugList');
var BugEdit = require('./BugEdit');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;

var NoMatch = React.createClass({
  render: function(){
    return (
      <h2>No match for the route</h2>
    )
  }
})
ReactDOM.render(
  (
    <MuiThemeProvider>
      <Router>
        <Route path="/bugs" component={BugList} />
        <Route path="/bugs/:id" component={BugEdit} />
        <Redirect from="/" to="/bugs" />
        <Route path="*" component={NoMatch} />
      </Router>
    </MuiThemeProvider>
  ),
  document.getElementById('main')
)
