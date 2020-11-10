import React, { Component } from 'react';
import logo from './img/prueba.png';
import './App.css';
/*import { tasks } from './task.json';*/
import TaskForm from './components/TaskForm';
import firebase from 'firebase';
import 'firebase/database';
import { DB_CONFIG } from './config/config.js';


//console.log(task);
//import Navigation from './components/Navigation';
//<Navigation titulo="Mi primera navegacion"/>
class App extends Component {

  constructor() {
    super();
    this.state = {
      tasks: [

      ]
    }
    this.handleAddTask = this.handleAddTask.bind(this);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('tasks');



  }

  componentDidMount() {
    const { tasks } = this.state;

    //cuando se agrega una nueva nota
    this.db.on('child_added', snap => {
      tasks.push({
        taskId: snap.key,
        taskTitle: snap.val().title,
        taskResposible: snap.val().responsible,
        taskDescription: snap.val().description,
        taskPriority: snap.val().priority
      })
      this.setState({ tasks });
    });


    /*Cuando se elimina una nota*/
    this.db.on('child_removed', snap => {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskId === snap.key) {
          tasks.splice(i, 1);
        }
      }
      this.setState({ tasks });
    });

  }



  handleAddTask(task) {
    /*  this.setState({
        tasks: [...this.state.tasks, task]
      })*/

    this.db.push().set({
      title: task.title,
      responsible: task.responsible,
      description: task.description,
      priority: task.priority
    });
  }


  removeTask(index) {
    if (window.confirm('Are you sure you want to delete this task?')) {
      /* this.setState({
         tasks: this.state.tasks.filter((e, i) => {
           return i !== index;
         })
       })*/
      this.db.child(index).remove();
    }


  }

  render() {
    
    const listTask = this.state.tasks.map((task, i) => {
      let typePriority = "";

      if (task.taskPriority === "High") {
        typePriority = "danger";
      } else if (task.taskPriority === "Low") {
        typePriority = "success";
      } else {
        typePriority = "warning";
      }

      typePriority = "badge badge-pill badge-" + typePriority + " ml-2";

      return (
        <div key={task.taskId} className="col-md-4">
          <div className="card mt-4">
            <div className="card-header">
              <h3>{task.taskTitle}</h3>
              <span className={typePriority}>
                {task.taskPriority}
              </span>
            </div>
            <div className="card-body">
              <p>{task.taskDescription}</p>
              <strong>{task.taskResponsible}</strong>
            </div>
            <div className="card-footer">
              <button className="btn btn-danger"

                onClick={this.removeTask.bind(this, task.taskId)} >Delete</button>

            </div>
          </div>
        </div>
        
      )
    }
    
    )
    //console.log(this.state.tasks);
    return (
      <div className="App">

        <nav className="navbar navbar-dark bg-dark">
          <a className="text-white" href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
            TASK
          <span className="badge badge-pill badge-light ml-2">
              {this.state.tasks.length}
            </span>
          </a>
        </nav>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-4 text-center">
              <img src={logo} className="App-logo" alt="logo" />
              <br/>
              <TaskForm onAddTask={this.handleAddTask} />
            </div>

            <div className="col-md-8">
              <div className="row">
                {listTask}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
