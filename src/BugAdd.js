var React = require('react');
var ReactDOM = require('react-dom');
import { Button, Panel, InputGroup, Form, FormControl, FormGroup } from 'react-bootstrap';


var BugAdd = React.createClass({
  render: function() {
    console.log("Rendering BugAdd");
    return(
      <Panel header="Add Bug">
        <form name="addBug">
          <FormGroup>
            <FormControl type='text' name='owner' placeholder='Owner'/>
          </FormGroup>
          <FormGroup>
            <FormControl type='text' name='title' placeholder='Title'/>
          </FormGroup>
          <FormGroup>
            <Button bsStyle="primary" onClick={this.handleSubmit}>Add Bug</Button>
          </FormGroup>
        </form>
      </Panel>
    )
  },
  handleSubmit: function(e){
    e.preventDefault();
    var form = document.forms.addBug;
    this.props.addBug({owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1'})
    form.owner.value = ""; form.title.value = "";
  }
});

module.exports = BugAdd
