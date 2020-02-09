import React from "react";
import { Link } from "react-router-dom";

class ViewTaskItem extends React.Component {
  days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  render() {
    const due = new Date(this.props.state.task.due);
    return (
      <div className="container">
        <br />
        <h2 className="card-title" style={{ letterSpacing: "0.5px" }}>
          Viewing task "{this.props.state.task.title}"
        </h2>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Task description:</h3>
          </div>
          <div className="panel-body">
            <h3>{this.props.state.task.description}</h3>
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Tags:</h3>
          </div>
          <div className="panel-body">
            <h3>{this.props.state.task.tags}</h3>
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Due on:</h3>
          </div>
          <div className="panel-body">
            <h3>
              {due.getDate().toString() +
                "-" +
                (due.getMonth() + 1).toString() +
                "-" +
                due.getFullYear().toString() +
                " " +
                this.days[due.getDay()]}
            </h3>
          </div>
        </div>

        {new Date(this.props.state.task.due) < new Date() &&
        !this.props.state.task.completed ? (
          <p style={{ color: "#2368fe" }} className="bg-warning">
            <br />
            <h4
              style={{
                margin: "10px",
                marginTop: "10px",
                marginBottom: "10px",
                fontSize: "1.3em"
              }}
            >
              The due date has already passed!
            </h4>
            <br />
          </p>
        ) : null}
        <Link to={`/edit/${this.props.state.task.id}`}>
          <button className="btn btn-primary btn-lg ">Edit</button>
        </Link>
      </div>
    );
  }
}

export default ViewTaskItem;
