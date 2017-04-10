var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
import Paper from 'material-ui/Paper';
import {Card, CardHeader} from 'material-ui/card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import AppBar from 'material-ui/AppBar';

var BugFilter = require('./BugFilter')
var BugAdd = require('./BugAdd')

var BugTable = React.createClass({
  render: function() {
    var bugRows = this.props.bugs.map(function(bug){
      return <BugRow key={bug._id} bug={bug} />
    });
    return(
      <Paper zDepth={1} style={{marginTop:10, marginBottom:10}}>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{width: 180}}>Id</TableHeaderColumn>
              <TableHeaderColumn style={{width: 40}}>Priority</TableHeaderColumn>
              <TableHeaderColumn style={{width: 40}}>Status</TableHeaderColumn>
              <TableHeaderColumn style={{width: 60}}>Owner</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bugRows}
          </TableBody>
        </Table>
      </Paper>
    )
  }
})

var BugRow = React.createClass({
  tableStyle: function(width, bug){
    var style = {height:24}
    if(width) style.width = width;
    if(bug.priority === 'P1') style.color = 'red';
    return style;
  },
  render: function(){
    var bug = this.props.bug;
    return(
      <TableRow>
        <TableRowColumn style={this.tableStyle(180, bug)}>
          <Link to={'/bugs/' + bug._id}>{bug._id}</Link>
        </TableRowColumn>
        <TableRowColumn style={this.tableStyle(40, bug)}>{bug.priority}</TableRowColumn>
        <TableRowColumn style={this.tableStyle(40, bug)}>{bug.status}</TableRowColumn>
        <TableRowColumn style={this.tableStyle(60, bug)}>{bug.owner}</TableRowColumn>
        <TableRowColumn style={this.tableStyle(undefined, bug)}>{bug.title}</TableRowColumn>
      </TableRow>
    )
  }
})

var BugList = React.createClass({
  getInitialState: function() {
    return{ bugs:[] }
  },
  render: function() {
    return(
      <div>
        <AppBar title="BugTracker"/>
        <BugFilter submitHandler={this.changeFilter} initFilter={this.props.location.query}/>
        <BugTable bugs={this.state.bugs}/>
        <BugAdd addBug={this.addBug}/>
      </div>
    )
  },

  componentDidMount: function() {
    this.loadData();
  },

  componentDidUpdate: function(prevProps) {
    var oldQuery = prevProps.location.query;
    var newQuery = this.props.location.query;
    if (oldQuery.priority === newQuery.priority &&
        oldQuery.status === newQuery.status) {
      return;
    } else {
      this.loadData();
    }
  },

  loadData: function() {
    var query = this.props.location.query || {};
    var filter = {priority: query.priority, status: query.status};

    $.ajax('/api/bugs', {data:filter}).done(function(data) {
      this.setState({bugs: data});
    }.bind(this));
    // In production, we'd also handle errors.
  },

  changeFilter: function(newFilter) {
    this.props.history.push({search: '?' + $.param(newFilter)});
    this.loadData(newFilter);
  },

  addBug: function(bug) {
    $.ajax({
      type: 'POST', url: '/api/bugs/', contentType: 'application/json',
      data: JSON.stringify(bug),
      success: function(data) {
        var bug = data;
        // We're advised not to modify the state, it's immutable. So, make a copy.
        var bugsModified = this.state.bugs.concat(bug);
        this.setState({bugs: bugsModified});
      }.bind(this),
      error: function(xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding bug:", err);
      }
    });

  }
});

module.exports = BugList
