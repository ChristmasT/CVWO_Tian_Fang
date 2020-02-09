import React from "react";
import "../bootstrap.css";

class Footer extends React.Component {
  render() {
    return (
      <nav
        className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark"
        style={{ marginBottom: "0px", borderRadius: "0px" }}
      >
        <div className="container">
          <div className="row text-center">
            <p className="text-light">CVWO Final Assignment by Tian Fang</p>
          </div>
        </div>
      </nav>
    );
  }
}

export default Footer;
