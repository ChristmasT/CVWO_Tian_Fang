import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import Header from "./layout/Header";
import Jumbotron from "./layout/Jumbotron";
import Footer from "./layout/Footer";
import About from "./pages/About";
import Tasks from "./Tasks";
import NewTask from "./NewTask";
import ViewTask from "./ViewTask";
import EditTask from "./EditTask";
import "./bootstrap.css";

class App extends React.Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    Axios.get("https://tian-fang-taskmanager.herokuapp.com/tasks").then(res =>
      this.setState({
        tasks: res.data
      })
    );
  }

  addTask = (title, description, tags, due) => {
    Axios.post("https://tian-fang-taskmanager.herokuapp.com/tasks", {
      title,
      description,
      tags,
      completed: false,
      due
    }).then(res =>
      this.setState({
        tasks: [...this.state.tasks, res.data]
      })
    );
  };

  delTask = id => {
    Axios.delete("https://tian-fang-taskmanager.herokuapp.com/tasks/${id}").then(res =>
      this.setState({
        tasks: [...this.state.tasks.filter(task => task.id !== id)]
      })
    );
  };

  updateTask = (id, title, description, tags, completed, due) => {
    Axios.put("https://tian-fang-taskmanager.herokuapp.com/tasks/${id}", {
      title,
      description,
      tags,
      completed,
      due
    }).then(res =>
      this.setState({
        tasks: [
          ...this.state.tasks.map(task => (task.id === id ? res.data : task))
        ]
      })
    );
  };

  markComplete = id => {
    this.setState({
      tasks: this.state.tasks.map(task => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      })
    });
    const task = this.state.tasks.filter(task => task.id === id)[0];
    this.updateTask(
      id,
      task.title,
      task.description,
      task.tags,
      task.completed,
      task.due
    );
  };

  getTags = () => {
    let res = [];
    this.state.tasks.map(task => {
      let words = task.tags.split(" ");
      res = res.concat(words);
    });
    let rec = [];
    while (res.length !== 0) {
      rec[rec.length] = res[0];
      res = res.filter(x => x !== res[0]);
    }
    return rec;
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Footer />
          <Route
            exact
            path="/"
            render={props => (
              <div>
                <Jumbotron />
                <div className="container">
                  <React.Fragment>
                    <Tasks
                      tasks={this.state.tasks}
                      delTask={this.delTask}
                      updateTask={this.updateTask}
                      markComplete={this.markComplete}
                      getTags={this.getTags}
                    />
                    <Link to="/new">
                      <button className="btn btn-primary btn-lg">
                        Add a new task
                      </button>
                    </Link>
                  </React.Fragment>
                </div>
              </div>
            )}
          />
          <Route path="/about" component={About} />
          <Route
            path="/new"
            render={props => (
              <React.Fragment>
                <NewTask addTask={this.addTask} />
              </React.Fragment>
            )}
          />
          <Route path="/view/:id" component={ViewTask} />
          <Route
            path="/edit/:id"
            render={props => (
              <React.Fragment>
                <EditTask
                  updateTask={this.updateTask}
                  delTask={this.delTask}
                  task={
                    this.state.tasks.filter(
                      task =>
                        task.id.toString() === props.match.params.id.toString()
                    )[0]
                  }
                />
              </React.Fragment>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
