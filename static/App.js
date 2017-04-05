"use strict";

var BugFilter = React.createClass({
  displayName: "BugFilter",

  render: function render() {
    console.log("Rendering BugFilter");
    return React.createElement(
      "div",
      null,
      "BugFilter"
    );
  }
});

var BugTable = React.createClass({
  displayName: "BugTable",

  render: function render() {
    console.log("Rendering bug table, num items:", this.props.bugs.length);
    var bugRows = this.props.bugs.map(function (bug) {
      return React.createElement(BugRow, { key: bug._id, bug: bug });
    });
    return React.createElement(
      "table",
      null,
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "Id"
          ),
          React.createElement(
            "th",
            null,
            "Priority"
          ),
          React.createElement(
            "th",
            null,
            "Status"
          ),
          React.createElement(
            "th",
            null,
            "Owner"
          ),
          React.createElement(
            "th",
            null,
            "Title"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        bugRows
      )
    );
  }
});

var BugAdd = React.createClass({
  displayName: "BugAdd",

  render: function render() {
    console.log("Rendering BugAdd");
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        { name: "addBug" },
        React.createElement("input", { type: "text", name: "owner", placeholder: "Owner" }),
        React.createElement("input", { type: "text", name: "title", placeholder: "Title" }),
        React.createElement(
          "button",
          { onClick: this.handleSubmit },
          "Add Bug"
        )
      )
    );
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.addBug;
    this.props.addBug({ owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1' });
    form.owner.value = "";form.title.value = "";
  }
});

var BugRow = React.createClass({
  displayName: "BugRow",

  render: function render() {
    console.log("Rendering BugRow:", this.props.bug);
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        this.props.bug._id
      ),
      React.createElement(
        "td",
        null,
        this.props.bug.priority
      ),
      React.createElement(
        "td",
        null,
        this.props.bug.status
      ),
      React.createElement(
        "td",
        null,
        this.props.bug.owner
      ),
      React.createElement(
        "td",
        null,
        this.props.bug.title
      )
    );
  }
});

var Buglist = React.createClass({
  displayName: "Buglist",

  getInitialState: function getInitialState() {
    return { bugs: [] };
  },
  render: function render() {
    console.log("Rendering bug list, num items:", this.state.bugs.length);
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        " BugTracker "
      ),
      React.createElement(BugFilter, null),
      React.createElement("hr", null),
      React.createElement(BugTable, { bugs: this.state.bugs }),
      React.createElement("hr", null),
      React.createElement(BugAdd, { addBug: this.addBug })
    );
  },

  componentDidMount: function componentDidMount() {
    $.ajax('/api/bugs').done(function (data) {
      this.setState({ bugs: data });
    }.bind(this));
    // In production, we'd also handle errors.
  },

  addBug: function addBug(bug) {
    $.ajax({
      type: 'POST', url: '/api/bugs/', contentType: 'application/json',
      data: JSON.stringify(bug),
      success: function (data) {
        var bug = data;
        // We're advised not to modify the state, it's immutable. So, make a copy.
        var bugsModified = this.state.bugs.concat(bug);
        this.setState({ bugs: bugsModified });
      }.bind(this),
      error: function error(xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding bug:", err);
      }
    });
  }
});

ReactDOM.render(React.createElement(Buglist, null), document.getElementById('main'));