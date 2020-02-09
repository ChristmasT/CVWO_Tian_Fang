import React from "react";
import { Link } from "react-router-dom";
import "../bootstrap.css";

class Header extends React.Component {
  render() {
    return (
      <nav
        className="navbar navbar-inverse "
        style={{ marginBottom: "0px", borderRadius: "0px" }}
      >
        <div className="container">
          <div className="text-lg-center">
            <h1>Task Manager</h1>
          </div>
        </div>
        <div className="container">
          <div className="pull-right">
            <h4>
              <Link style={{ color: "#fff" }} to="/">
                Home
              </Link>
            </h4>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
