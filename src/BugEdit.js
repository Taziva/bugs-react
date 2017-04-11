var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link
import {Alert, Button, Panel, InputGroup, Form, FormControl, FormGroup, ButtonToolbar, ControlLabel } from 'react-bootstrap';


var BugEdit = React.createClass({
  render: function() {
    var success= (
      <Alert bsStyle="success" onDismiss={this.dismissSuccess}>
        Saved
      </Alert>
    );
    return (
      <div style={{maxWidth: 600}}>
        <Panel header={"Edit bug: " + this.props.params.id}>
          <br/>
          <form onSubmit={this.submit}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Priority:</ControlLabel>
              <FormControl componentClass="select"value={this.state.priority} onChange={this.onChangePriority}>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Status:</ControlLabel>
              <FormControl componentClass="select" value={this.state.status} onChange={this.onChangeStatus}>
                <option>New</option>
                <option>Open</option>
                <option>Fixed</option>
                <option>Closed</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>
                  Owner:
                </InputGroup.Addon>
                <FormControl type="text" value={this.state.owner} onChange={this.onChangeOwner}/>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>
                  Title:
                </InputGroup.Addon>
              <FormControl type="text" value={this.state.title} onChange={this.onChangeTitle}/>
              </InputGroup>
            </FormGroup>
            <ButtonToolbar>
              <Button bsStyle="primary" type="submit">Submit</Button>
              <Link to="/bugs" className="btn btn-link">Back</Link>
            </ButtonToolbar>
          </form>
        </Panel>
        {this.state.saveSuccess? success: null}
      </div>
    );
  },

  getInitialState: function() {
    return {saveSuccess: false};
  },

  componentDidMount: function() {
    this.loadData();
  },

  componentDidUpdate: function(prevProps) {
    console.log("BugEdit: componentDidUpdate", prevProps.params.id, this.props.params.id);
    if (this.props.params.id != prevProps.params.id) {
      this.loadData();
    }
  },

  loadData: function() {
    $.ajax('/api/bugs/' + this.props.params.id) .done(function(bug) {
      this.setState(bug);
    }.bind(this));
  },

  onChangePriority: function(e) {
    this.setState({priority: e.target.value});
  },
  onChangeStatus: function(e) {
    this.setState({status: e.target.value});
  },
  dismissSuccess: function() {
    this.setState({saveSuccess: false})
  },
  showSuccess: function() {
    this.setState({saveSuccess: true})
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
        this.showSuccess();
      }.bind(this),
    });
  }
});

module.exports = BugEdit;
