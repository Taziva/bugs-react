var React = require('react');
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require("react-tap-event-plugin");
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


import {
  cyan900,
  indigo900,
} from 'material-ui/styles/colors';

injectTapEventPlugin();

var anyValue = '*'

var BugFilter = React.createClass({
  render: function() {
    return(
      <Card initiallyExpanded={this.state.expanded}>
      <CardHeader
      title="Filter"
      subtitle="Show filtered list"
      avatar={<Avatar
        icon={<FontIcon className="fa fa-filter"/>}
        color={cyan900}
      />}
      actAsExpander={true}
      showExpandableButton={true}
      />
      <CardText expandable={true} style={{paddingTop:0}}>
      <SelectField floatingLabelText="Status" value={this.state.status} onChange={this.onChangeStatus}>
        <MenuItem value={anyValue} primaryText="All"/>
        <MenuItem value="New" primaryText="New"/>
        <MenuItem value="Open" primaryText="Open"/>
        <MenuItem value="Closed" primaryText="Closed"/>
      </SelectField>
      <SelectField floatingLabelText="Priority" value={this.state.priority} onChange={this.onChangePriority}>
        <MenuItem value={anyValue} primaryText="All"></MenuItem>
        <MenuItem value="P1" primaryText="P1"></MenuItem>
        <MenuItem value="P2" primaryText="P2"></MenuItem>
        <MenuItem value="P3" primaryText="P3"></MenuItem>
      </SelectField>
      <br />
      <RaisedButton label="Apply" primary={true} onTouchTap={this.submit}/>
      </CardText>
      </Card>
    )
  },
  getInitialState: function() {
    var initFilter = this.props.initFilter;
    return {status: initFilter.status || anyValue, priority: initFilter.priority || anyValue, expanded: false};
  },
  componentWillReceiveProps: function(newProps) {
    var newFilter = {
      status: newProps.initFilter.status || anyValue,
      priority: newProps.initFilter.priority || anyValue
    }
    if (newFilter.status === this.state.status
        && newFilter.priority === this.state.priority) {
      return;
    }
    this.setState({status: newFilter.status, priority: newFilter.priority});
  },

  onChangeStatus: function(e, index, value) {
    this.setState({status: value});
  },
  onChangePriority: function(e, index, value) {
    this.setState({priority: value})
  },
  submit: function(e) {
    var newFilter = {};
    if (this.state.priority != anyValue) newFilter.priority = this.state.priority;
    if (this.state.status != anyValue) newFilter.status = this.state.status;
    this.props.submitHandler(newFilter);
  }
})

module.exports = BugFilter
