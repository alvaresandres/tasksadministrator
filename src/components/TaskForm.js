
import React, { Component } from 'react';

class TaskForm extends Component {

    constructor() {
        super();

        this.state = {

            title: '',
            responsible: '',
            description: '',
            priority: 'Low'
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        //console.log(e.target.value,e.target.name);
        const { value, name } = e.target; //recupera valor y nombre del target.

        this.setState({
            [name]: value
        })
        console.log(this.state);
    }

    handleSubmit(e) {
        e.preventDefault();//Evita refrecar la pagina
        this.props.onAddTask(this.state);//onAddTask enviado desde App.js
        
        const {  title } = e.target; //recupera valor y nombre del target.
        const {  responsible } = e.target; //recupera valor y nombre del target.
        const {  description } = e.target; //recupera valor y nombre del target.
        const {  priority } = e.target; //recupera valor y nombre del target.
        title.value="";
        responsible.value="";
        description.value="";
        priority.value="Low";

        title.focus();



    }
    render() {

        return (
            <div className="card">
                <form className="card-body" onSubmit={this.handleSubmit}>

                    <div className="form-group" >
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Title"
                            onChange={this.handleInput} />
                    </div>

                    <div className="form-group" >
                        <input
                            type="text"
                            name="responsible"
                            className="form-control"
                            placeholder="responsible"
                            onChange={this.handleInput} />
                    </div>

                    <div className="form-group" >
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            placeholder="description"
                            onChange={this.handleInput} />
                    </div>

                    <div className="form-group" >
                        <select
                            name="priority"
                            className="form-control"
                            onChange={this.handleInput}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary"> Save</button>

                </form>
            </div>
        )
    }

}

export default TaskForm;