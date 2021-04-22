import React, { Component } from "react";
import firestore from "../../database/firebase";
import "./css/EventDetail.css";
import "../../App.css";

//TODO: Make it functional
import { GetEvent } from "../models/events";
import { GetUser } from "../models/users";

class EventDetails extends Component {
  state = {
    posts: {},
  };
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    // get firestore collection = events , document = eventId , setState of posts from doc
    firestore
      .collection("events")
      .doc(params.eventId)
      .get()
      .then((snapshot) => {
        const { event } = snapshot.data();
        console.log("event", event);
        this.setState({
          posts: event,
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  render() {
    const { posts } = this.state;
    // const { host } = GetUser(posts.uid); could use this after transform to functional component
    //TODO:do something with host detail
    //TODO:do something with new button
    //TODO:align many things
    return (
      <div className="App-skeleton-ground">
        <div className="host-detail">
          host detail
          <br></br>
          <button type="button" className="join-btn">
            join
          </button>
          <br></br>
          <button type="button" className="report-btn">
            report
          </button>
        </div>
        <div className="event-detail">
          <h1>{posts.title}</h1>
          <p>{posts.description}</p>
          <p>Number of Attendee : {posts.noAttendee}</p>
          <p>Total of : {posts.maxAttendee}</p>
          <p>Cost : {posts.cost}</p>
          <p>Event Date : {posts.date}</p>
          {/* TODO: Date from firestore return as object {seconds , nanoseconds } find a way*/}
          {/* <p>Since : {posts.dateCreated}</p> */}
          <p>{posts.image}</p>
        </div>
      </div>
    );
  }
}

export default EventDetails;
