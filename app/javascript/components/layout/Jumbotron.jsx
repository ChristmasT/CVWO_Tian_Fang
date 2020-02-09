import React from "react";
import { Link } from "react-router-dom";
import "../bootstrap.css";

class Jumbotron extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h1>Welcome to Task Manager!</h1>
          <div className="text-sm-center">
            <p>
              {" "}
              where you can keep yourself organized by listing tasks to be
              finished
            </p>
          </div>
          <div className="text-center">
            <h4>
              <Link
                className="btn btn-primary btn-lg m-1 "
                style={{ color: "#fff" }}
                to="/about"
              >
                Read More
              </Link>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
