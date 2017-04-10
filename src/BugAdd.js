var React = require('react');
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require("react-tap-event-plugin");
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';


import {
  cyan900,
  indigo900,
} from 'material-ui/styles/colors';

var BugAdd = React.createClass({
  render: function() {
    return(
      <Card initiallyExpanded={true}>
        <CardHeader
          title="Create"
          subtitle="Add a bug"
          avatar={
            <Avatar
            icon={<FontIcon className="fa fa-filter"/>}
            color={cyan900}
            />
          }
          actAsExpander={true}
          showExpandableButton={true}
          />
        <CardText expandable={true} style={{paddingTop:0}}>
          <TextField value={this.state.owner} onChange={this.onChangeOwner} floatingLabelText="Owner"/>
          <TextField value={this.state.title} onChange={this.onChangeTitle} floatingLabelText="Title"/>
          <br />
          <RaisedButton primary={true} onTouchTap={this.handleSubmit} label="Add Bug" />
        </CardText>
      </Card>
    )
  },
  getInitialState: function() {
    return {owner: "", title: ""}
  },
  onChangeOwner: function (e) {
    this.setState({owner:e.target.value})
  },
  onChangeTitle: function (e) {
    this.setState({title:e.target.value})
  },
  handleSubmit: function(e){
    this.props.addBug({owner: this.state.owner, title: this.state.title, status: 'New', priority: 'P1'})
    this.state.owner = ""; this.state.title = "";
  }
});

module.exports = BugAdd
