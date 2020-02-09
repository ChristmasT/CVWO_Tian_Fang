import React from "react";
import ViewTaskItem from "./ViewTaskItem";

const ViewTask = props => (
  <ViewTaskItem id={props.match.params.id} state={props.location.state} />
);

export default ViewTask;
