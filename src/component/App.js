import React, { Component } from "react";
import { connect } from "react-redux";
import { add_reminder } from "../actions";
import {remove_reminder} from "../actions";
import moment from 'moment';
import images from '../images.png'
import {clear_reminder} from "../actions";

class App extends Component {
  state = {
    text: "",
    date: new Date(),
  };

  reminder_Renders = () => {
    if(this.props.reminders){
    const { reminders } = this.props;
    return (
      <ul className="list-group">
        {
        this.props.reminders.map(reminder => {
          return (
            <li key={reminder.id} className="list-group-item">
              <div>{reminder.text}</div>
              <div>{moment(new Date(reminder.date)).fromNow()}</div>
              <div className='closeIcon btn btn-danger' onClick={() => this.props.remove_reminder(reminder.id)}>x</div>
            </li>
          );
        })}
      </ul>
    );
    }
  };

  render() {
    return (
      <div className="App">
        <img src={images} />
        <div className="reminder-title">
          <h2>What Should You Do ?</h2>
        </div>
        <form>
          <input
            onChange={(e) => this.setState({ text: e.target.value })}
            value={this.state.text}
            className="x form-control"
            type="text"
            placeholder="Enter What You Think ..."
          />
          <input
            onChange={(e) => this.setState({ date: e.target.value })}
            value={this.state.date}
            className="x form-control"
            type="datetime-local"
          />
        </form>
        <button
          onClick={() =>{ this.props.add_reminder(this.state.text,this.state.date)
          this.setState({text: '', date:''})}}
          className="x btn btn-primary btn-block"
        >
          Add Reminder
        </button>
        {this.reminder_Renders()}
        <button 
        className='clearreminder'
        onClick={()=>this.props.clear_reminder()}
        className="btn btn-danger btn-block">Clear Reminders</button>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//     return{
//         add_reminder:()=>dispatch(add_reminder())
//     }
// }

// function mapStateToProps(state) {
//   return {
//     reminder: state,
//   };
// }

export default connect(
  (state) => {
    return {
      reminders: state,
    };
  },
  { add_reminder,remove_reminder,clear_reminder }
)(App);
