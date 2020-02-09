import React from "react";
import { Link } from "react-router-dom";
import "./bootstrap.css";

export class TagItem extends React.Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.task.completed ? "line-through" : "none",
      textAlign: "left",
      color:
        new Date(this.props.task.due) < new Date() && !this.props.task.completed
          ? "#ff7b31"
          : "rgba(0,0,0,0.52)"
    };
  };

  days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  render() {
    const { id, title, description, tags, completed } = this.props.task;
    const due = new Date(this.props.task.due);
    return (
      <tr style={this.getStyle()}>
        <td>
          <input
            type="checkbox"
            checked={this.props.task.completed}
            onChange={this.props.markComplete.bind(this, id)}
          />
        </td>
        <td>{title}</td>
        <td>{description}</td>
        <td>{tags}</td>
        <td>
          {due.getDate().toString() +
            "-" +
            (due.getMonth() + 1).toString() +
            "-" +
            due.getFullYear().toString() +
            " " +
            this.days[due.getDay()]}
        </td>
        <td>
          <h4>
            <button
              className="btn btn-danger btn-md"
              onClick={this.props.delTask.bind(this, id)}
            >
              Delete
            </button>
            <Link
              to={{
                pathname: `/view/${id}`,
                state: {
                  task: this.props.task
                }
              }}
            >
              <button className="btn btn-info btn-md"> View </button>
            </Link>
            <Link to={`/edit/${id}`}>
              <button className="btn btn-primary btn-md "> Edit </button>
            </Link>
          </h4>
        </td>
      </tr>
    );
  }
}

export default TagItem;
