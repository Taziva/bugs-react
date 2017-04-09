var React = require('react');
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require("react-tap-event-plugin");
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

injectTapEventPlugin();

var BugFilter = React.createClass({
  render: function() {
    return(
      <Card>
      <CardHeader
      title="Filter"
      subtitle="Show Filtered List"
      avatar={ <Avatar
        icon={<FontIcon className="fa fa-filter"/>}
      />}
      />
      Status:
      <select value={this.state.status} onChange={this.onChangeStatus}>
        <option value="">All</option>
        <option value="New">New</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </select>
      Priority:
      <select value={this.state.priority} onChange={this.onChangePriority}>
        <option value="">All</option>
        <option value="P1">P1</option>
        <option value="P2">P2</option>
        <option value="P3">P3</option>
      </select>
      <RaisedButton label="Apply" onTouchTap={this.submit}/>
      </Card>
    )
  },
  getInitialState: function() {
    var initFilter = this.props.initFilter;
    return {status: initFilter.status, priority: initFilter.priority};
  },
  componentWillReceiveProps: function(newProps) {
    if (newProps.initFilter.status === this.state.status
        && newProps.initFilter.priority === this.state.priority) {
      console.log("BugFilter: componentWillReceiveProps, no change");
      return;
    }
    console.log("BugFilter: componentWillReceiveProps, new filter:", newProps.initFilter);
    this.setState({status: newProps.initFilter.status, priority: newProps.initFilter.priority});
  },

  onChangeStatus: function(e) {
    this.setState({status: e.target.value});
  },
  onChangePriority: function(e) {
    this.setState({priority: e.target.value})
  },
  submit: function(e) {
    var newFilter = {};
    if (this.state.priority) newFilter.priority = this.state.priority;
    if (this.state.status) newFilter.status = this.state.status;
    this.props.submitHandler(newFilter);
  }
})

module.exports = BugFilter
