import React from "react";
import AddTask from "./AddTask";

export class NewTask extends React.Component {
  render() {
    return (
      <div>
        <br />
        <h2 className="card-title">Create new tasks:</h2>
        <AddTask addTask={this.props.addTask} />
      </div>
    );
  }
}

export default NewTask;
