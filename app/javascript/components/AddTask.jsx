import React from "react";
import PropTypes from "prop-types";

class AddTask extends React.Component {
  state = {
    title: "",
    description: "",
    tags: "",
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate()
  };
  // add leading zeros if the date or month is smaller than 10
  manipulateTime = time => {
    if (parseInt(time) < 10) return "0" + time;
    else return time;
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.checkValid()) {
      this.props.addTask(
        this.state.title,
        this.state.description,
        this.state.tags,
        new Date(
          this.state.year.toString() +
            "-" +
            this.manipulateTime(this.state.month.toString()) +
            "-" +
            this.manipulateTime(this.state.date.toString())
        )
      );
      this.setState({
        title: "",
        description: "",
        tags: "",
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate()
      });
      window.location.href = "/";
    }
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

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <h3>
              <label className="label label-info label">New task title:</label>
            </h3>

            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Task title"
              value={this.state.title}
              onChange={this.onChange}
              style={{ height: "40px", fontSize: "1.5em" }}
            />

            {this.renderErrorTitle()}
            <br />
            <h3>
              <label className="label label-info label">
                Task description:
              </label>
            </h3>

            <textarea
              className="form-control"
              type="text"
              name="description"
              placeholder="Description of the task"
              value={this.state.description}
              onChange={this.onChange}
              style={{ height: "50px", fontSize: "1.4em" }}
            />
            <br />
            <h3>
              <label className="label label-info label">
                Tags: (use space to separate the tags)
              </label>
            </h3>

            <input
              className="form-control"
              type="text"
              name="tags"
              placeholder="Add tags (use space to separate the tags)"
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
            <br />
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary btn-lg m-2"
            />
          </div>
        </form>
      </div>
    );
  }
}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired
};

export default AddTask;
