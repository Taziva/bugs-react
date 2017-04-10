var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { cyan900, indigo900} from 'material-ui/styles/colors';

var BugEdit = React.createClass({
  render: function() {
    return (
      <Card>
        <CardHeader
          title="Edit Bug"
          subtitle={this.props.params.id}
          avatar={
            <Avatar
              icon={<FontIcon className="fa fa-bug"/>}
              color={cyan900}
            />
          }
        />
        <CardText>
          <SelectField floatingLabelText="Status" value={this.state.status} onChange={this.onChangeStatus}>
            <MenuItem value="New" primaryText="New"/>
            <MenuItem value="Open" primaryText="Open"/>
            <MenuItem value="Closed" primaryText="Closed"/>
          </SelectField>
          <SelectField floatingLabelText="Priority" value={this.state.priority} onChange={this.onChangePriority}>
            <MenuItem value="P1" primaryText="P1"></MenuItem>
            <MenuItem value="P2" primaryText="P2"></MenuItem>
            <MenuItem value="P3" primaryText="P3"></MenuItem>
          </SelectField>
          <br/>
          <TextField fullWidth={true} value={this.state.owner} onChange={this.onChangeOwner} floatingLabelText="Owner"/>
          <TextField fullWidth={true} value={this.state.title} multiLine={true} onChange={this.onChangeTitle} floatingLabelText="Title"/>
          <br/>
          <RaisedButton label="Save" primary={true} onTouchTap={this.submit}/>
          <FlatButton href="/#/bugs" label="Back to bug list" style={{verticalAlign: 'top'}}/>
          <Snackbar
          open={this.state.successSave}
          message="Saved!"
          autoHideDuration={4000}
          onActionTouchTap={this.dismissSuccessNote}
          onRequestClose={this.dismissSuccessNote}
        />
        </CardText>
      </Card>
    );
  },

  getInitialState: function() {
    return {successSave:false};
  },

  componentDidMount: function() {
    this.loadData();
  },

  showSuccessSave: function() {
    this.setState({successSave:true})
  },
  dismissSuccessNote: function(){
    this.setState({successSave:false})
  },
  componentDidUpdate: function(prevProps) {
    if (this.props.params.id != prevProps.params.id) {
      this.loadData();
    }
  },

  loadData: function() {
    $.ajax('/api/bugs/' + this.props.params.id) .done(function(bug) {
      this.setState(bug);
    }.bind(this));
  },

  onChangePriority: function(e,index,value) {
    this.setState({priority: value});
  },
  onChangeStatus: function(e,index,value) {
    this.setState({status: value});
  },
  onChangeOwner: function(e) {
    this.setState({owner: e.target.value});
  },
  onChangeTitle: function(e) {
    this.setState({title: e.target.value});
  },

  submit: function(e) {
    e.preventDefault();
    var bug = {
      status: this.state.status,
      priority: this.state.priority,
      owner: this.state.owner,
      title: this.state.title
    }

    $.ajax({
      url: '/api/bugs/' + this.props.params.id, type: 'PUT', contentType:'application/json',
      data: JSON.stringify(bug),
      dataType: 'json',
      success: function(bug) {
        this.setState(bug);
        this.successSave;
      }.bind(this),
    });
  }
});

module.exports = BugEdit;
