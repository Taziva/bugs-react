var React = require('react');
var ReactDOM = require('react-dom');

var BugFilter = React.createClass({
  render: function() {
    return(
      <div>
      <h3>Filter</h3>
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
      <button onClick={this.submit}>Test Filter</button>
      </div>
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
