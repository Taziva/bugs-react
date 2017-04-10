var React = require('react');
var ReactDOM = require('react-dom');
import { Button, Panel, Grid, Row, Col, InputGroup, InputGroupButton } from 'react-bootstrap';

var BugFilter = React.createClass({
  render: function() {
    return(
      <Panel collapsible defaultExpanded={true} header="Filter">
        <Grid fluid={true}>
          <Row>
            <Col xs={12} sm={6} md={4}>
              Status:
              <select value={this.state.status} onChange={this.onChangeStatus}>
                <option value="">All</option>
                <option value="New">New</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </Col>
            <Col xs={12} sm={6} md={4}>
              Priority:
              <select value={this.state.priority} onChange={this.onChangePriority}>
                <option value="">All</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </select>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <InputGroup label="&nbsp;">
                <Button bsStyle="primary" onClick={this.submit}>Filter</Button>
              </InputGroup>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  },
  getInitialState: function() {
    var initFilter = this.props.initFilter;
    return {status: initFilter.status, priority: initFilter.priority, open:true};
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
