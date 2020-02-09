import React from "react";
import TaskItem from "./TaskItem";
import "./bootstrap.css";

class Tasks extends React.Component {
  state = {
    selectedvalue: "all"
  };

  sortingMethod = (a, b) => {
    return a.tags === b.tags ? a.title > b.title : a.tags > b.tags;
  };

  handleChange = e => {
    this.setState({
      selectedvalue: e.target.value
    });
  };

  renderTable = tasks => {
    return (
      <tbody>
        {tasks.sort(this.sortingMethod).map(task => (
          <TaskItem
            task={task}
            delTask={this.props.delTask}
            updateTask={this.props.updateTask}
            markComplete={this.props.markComplete}
          />
        ))}
      </tbody>
    );
  };

  checkTable = () => {
    return this.state.selectedvalue === "all"
      ? this.renderTable(this.props.tasks)
      : this.renderTable(
          this.props.tasks.filter(
            task =>
              task.tags.split(" ").filter(x => x === this.state.selectedvalue)
                .length > 0
          )
        );
  };

  render() {
    return (
      <div>
        <h2 className="card-title">All tasks:</h2>
        <h3>
          <label className="label label-default pull-left m-2">
            Select Tag:
          </label>
          <select
            selectedvalue={this.state.selectedvalue}
            onChange={this.handleChange}
          >
            {this.props.getTags().map(tag => (
              <option selectedvalue={tag}>{tag}</option>
            ))}
            <option selectedvalue="all">all</option>
          </select>
        </h3>

        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th></th>
                <th>
                  <h4>Title</h4>
                </th>
                <th>
                  <h4>Description</h4>
                </th>
                <th>
                  <h4>Tags</h4>
                </th>
                <th>
                  <h4>Due</h4>
                </th>
                <th></th>
              </tr>
            </thead>
            {this.checkTable()}
          </table>
        </div>
      </div>
    );
  }
}

export default Tasks;
