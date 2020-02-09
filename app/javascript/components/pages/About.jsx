import React from "react";

function About() {
  return (
    <React.Fragment>
      <div style={{ textAlign: "left" }}>
        <br />
        <h2 className="card-title">About:</h2>
        <hr />
        <div className="container">
          <p className="lead" style={{ fontSize: "1.7em" }}>
            Just like other normal task management app, the Task Manager allows
            you to create new tasks and edit, view or delete existing tasks. If
            the due time has already passed, the task’s color will change from
            grey to orange to remind you. Anytime when you want to go back to
            the home page, simply press the home bottom in the navigation
            bar. Moreover, you can check or uncheck tasks using the checkbox on
            the left side of every task. And the checked task will be crossed
            out. Furthermore, a tag system is introduced so that you can easily
            find tasks associated with a certain tag.
          </p>
          <br />
          <p className="lead" style={{ fontSize: "1.7em" }}>
            Hope you enjoy the Task Manager!
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default About;
