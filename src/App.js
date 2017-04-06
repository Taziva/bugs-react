var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery')

var BugFilter = React.createClass({
  render: function() {
    console.log("Rendering BugFilter");
    return(
      <div>BugFilter</div>
    )
  }
})

var BugTable = React.createClass({
  render: function() {
    console.log("Rendering bug table, num items:", this.props.bugs.length);
    var bugRows = this.props.bugs.map(function(bug){
      return <BugRow key={bug._id} bug={bug} />
    });
    return(
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {bugRows}
          </tbody>
        </table>
    )
  }
})

var BugAdd = React.createClass({
  render: function() {
    console.log("Rendering BugAdd");
    return(
      <div>
      <form name="addBug">
      <input type='text' name='owner' placeholder='Owner'/>
      <input type='text' name='title' placeholder='Title'/>
      <button onClick={this.handleSubmit}>Add Bug</button>
      </form>
      </div>
    )
  },
  handleSubmit: function(e){
    e.preventDefault();
    var form = document.forms.addBug;
    this.props.addBug({owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1'})
    form.owner.value = ""; form.title.value = "";
  }
});

var BugRow = React.createClass({
  render: function(){
    console.log("Rendering BugRow:", this.props.bug);
    return(
      <tr>
        <td>{this.props.bug._id}</td>
        <td>{this.props.bug.priority}</td>
        <td>{this.props.bug.status}</td>
        <td>{this.props.bug.owner}</td>
        <td>{this.props.bug.title}</td>
      </tr>
    )
  }
})

var Buglist = React.createClass({
  getInitialState: function() {
    return{ bugs:[] }
  },
  render: function() {
    return(
      <div>
      <div>
        <h1> BugTracker </h1>
        <BugFilter />
        <hr/>
        <BugTable bugs={this.state.bugs}/>
        <hr/>
        <BugAdd addBug={this.addBug}/>
      </div>
      <footer>
      <p>&copy; Renaissance Vision Parter</p>
      </footer>
      </div>
    )
  },

  componentDidMount: function() {
    $.ajax('/api/bugs').done(function(data) {
      this.setState({bugs: data});
    }.bind(this));
    // In production, we'd also handle errors.
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


ReactDOM.render(
  <Buglist />,
  document.getElementById('main')
)
