import React, { Component } from "react";
import firestore from "../../database/firebase";

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
        this.setState({
          posts: snapshot.data(),
        });
        console.log(this.state);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  render() {
    const { posts } = this.state;

    return (
      <div className="event-detail">
        <h1>{posts.eventName}</h1>
        <p>{posts.description}</p>
        <p>Number of Attendee : {posts.attendeeNumber}</p>
        <p>Total of : {posts.maxAttendee}</p>
        <p>Cost : {posts.cost}</p>
        <p>Event Date : {posts.eventDate}</p>
        <p>Since : {posts.dateCreated}</p>
        <img src={posts.image} alt={posts.image} />
      </div>
    );
  }
}

export default EventDetails;
