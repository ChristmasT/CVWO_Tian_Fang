import React from "react";

import { Link } from "react-router-dom";

export class EditTask extends React.Component {
  state = {
    title: this.props.task.title,
    description: this.props.task.description,
    tags: this.props.task.tags,
    completed: this.props.task.completed,
    date: new Date(this.props.task.due).getDate(),
    month: new Date(this.props.task.due).getMonth() + 1,
    year: new Date(this.props.task.due).getFullYear()
  };
  // add leading zeros if the date or month is smaller than 10
  manipulateTime = time => {
    if (parseInt(time) < 10) return "0" + time;
    else return time;
  };

  //update date
  onSubmit = e => {
    e.preventDefault();
    if (this.checkValid()) {
      this.props.updateTask(
        this.props.task.id,
        this.state.title,
        this.state.description,
        this.state.tags,
        this.state.completed,
        new Date(
          this.state.year.toString() +
            "-" +
            this.manipulateTime(this.state.month.toString()) +
            "-" +
            this.manipulateTime(this.state.date.toString())
        )
      ),
        console.log(this.state.year);
      this.setState({
        title: this.state.title,
        description: this.state.description,
        tags: this.state.tags,
        completed: this.state.completed,
        year: new Date(this.props.task.due).getFullYear(),
        month: new Date(this.props.task.due).getMonth() + 1,
        date: new Date(this.props.task.due).getDate()
      });
      window.location.href = "/";
    }
  };

  //store input in state
  onChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      console.log(e.target.name)
    );
  };

  //render the drop-down menu
  renderDropDown = () => {
    return (
      <select
        name="completed"
        value={this.state.completed}
        onChange={this.onChange}
        style={{ width: "100px" }}
      >
        <option value={true}>Completed</option>
        <option value={false}>Not done</option>
      </select>
    );
  };

  //render error message for title if the title is empty
  renderErrorTitle = () => {
    return this.state.title === "" ? (
      <p>The task title must not be empty!</p>
    ) : null;
  };

  //render error messgage for invalid date
  renderErrorDate = () => {
    return /^\d+$/.test(this.state.date) &&
      /^\d+$/.test(this.state.month) &&
      /^\d+$/.test(this.state.year) ? (
      parseInt(this.state.year) < 1000 ? (
        <p>Input year should be in 4-digit format</p>
      ) : parseInt(this.state.month) < 1 || parseInt(this.state.month) > 12 ? (
        <p>Input month is not valid</p>
      ) : parseInt(this.state.date) < 1 ||
        parseInt(this.state.date) >
          this.getDaysOfMonth(this.state.month, this.state.year) ? (
        <p>Input date is not valid</p>
      ) : null
    ) : (
      <p>Input must be numbers!</p>
    );
  };

  //check whether the input date is valid
  checkValid = () => {
    return (
      this.state.title !== "" &&
      /^\d+$/.test(this.state.date) &&
      /^\d+$/.test(this.state.month) &&
      /^\d+$/.test(this.state.year) &&
      parseInt(this.state.year) >= 1000 &&
      parseInt(this.state.month) >= 1 &&
      parseInt(this.state.month) <= 12 &&
      parseInt(this.state.date) >= 1 &&
      parseInt(this.state.date) <=
        this.getDaysOfMonth(this.state.month, this.state.year)
    );
  };

  //a simple function to get the number of days in a given month
  getDaysOfMonth = (m, y) => {
    return m === 2
      ? this.isGapYear(y)
        ? 29
        : 28
      : m === 4
      ? 30
      : m === 6
      ? 30
      : m === 9
      ? 30
      : m === 11
      ? 30
      : 31;
  };

  // check whether y is a gap year
  isGapYear = y => {
    return y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <br />
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <h3>
                <label className="label label-info label">Task title:</label>
              </h3>

              <input
                className="form-control"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                style={{ height: "40px", fontSize: "1.5em" }}
              />
              {this.renderErrorTitle()}
            </div>

            <h3>
              <label className="label label-info label">
                Task description:
              </label>
            </h3>

            <br />
            <div style={{}}>
              <textarea
                className="form-control"
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                style={{ height: "50px", fontSize: "1.4em" }}
              />
            </div>

            <br />
            <h3>
              <label className="label label-info label">
                Tags: (use space to separate the tags)
              </label>
            </h3>
            <br />
            <input
              className="form-control"
              type="text"
              name="tags"
              value={this.state.tags}
              onChange={this.onChange}
              style={{ height: "40px", fontSize: "1.5em" }}
            />

            <br />
            <h3>
              <label className="label label-info label">
                Due: (dd-mm-yyyy)
              </label>
            </h3>
            <p>
              <br />
              <input
                type="text"
                name="date"
                value={this.state.date}
                onChange={this.onChange}
                style={{ width: "50px", textAlign: "right" }}
              />
              -
              <input
                type="text"
                name="month"
                value={this.state.month}
                onChange={this.onChange}
                style={{ width: "50px", textAlign: "right" }}
              />
              -
              <input
                type="text"
                name="year"
                value={this.state.year}
                onChange={this.onChange}
                style={{ width: "80px", textAlign: "right" }}
              />
              {this.renderErrorDate()}
            </p>

            <h3>
              <label className="label label-info label">
                Whether completed:
              </label>
            </h3>
            <p>
              <br />
              <h3>{this.renderDropDown()}</h3>
            </p>
            <input
              className="btn btn-primary btn-lg"
              type="submit"
              value="Submit"
            />
          </form>
          <br />
          <Link to="/">
            <button
              className="btn btn-danger btn-lg"
              onClick={this.props.delTask.bind(
                this.props.task,
                this.props.task.id
              )}
            >
              Delete
            </button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default EditTask;
