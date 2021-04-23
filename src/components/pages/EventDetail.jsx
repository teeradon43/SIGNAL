import { useState, useEffect } from "react";
import firestore from "../../database/firebase";
import "./css/EventDetail.css";
import "../../App.css";

const EventDetails = (params) => {
  const [event, setEvent] = useState({});
  const [host, setHost] = useState({});
  const [uid, setUid] = useState("");

  async function fetchEvent() {
    const eid = params.match.params.eventId;
    const res = await firestore
      .collection("events")
      .doc(eid)
      .get()
      .then((snapshot) => {
        const event = snapshot.data().event;
        setEvent(event);
        setUid(event.uid);
      })
      .catch((err) => alert("ERROR: ", err));
  }

  async function fetchHost() {
    const userId = uid;
    const res = await firestore
      .collection("users")
      .doc(userId)
      .get()
      .then((snapshot) => {
        const user = snapshot.data();
        setHost(user);
      })
      .catch((err) => alert("ERROR: ", err));
  }

  useEffect(() => {
    fetchEvent();
    console.log("EVENT: ", event);
    console.log("HOST: ", host);
  }, []);

  useEffect(() => {
    if (uid) fetchHost();
  });

  return (
    <div className="App-skeleton-ground">
      {/* Host Section */}
      <div className="host-detail">
        <p>Host Detail</p>
        {host.displayName}
        <img src={host.img} />
        <br></br>
        <button type="button" className="join-btn">
          join
        </button>
        <br></br>
        <button type="button" className="report-btn">
          report
        </button>
      </div>

      {/* Event Section */}
      <div className="event-detail">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <p>Number of Attendee : {event.noAttendee}</p>
        <p>Total of : {event.maxAttendee}</p>
        <p>Cost : {event.cost}</p>
        <p>Event Date : {event.date}</p>
        {/* TODO: Date from firestore return as object {seconds , nanoseconds } find a way*/}
        {/* <p>Since : {posts.dateCreated}</p> */}
        <img src={event.image} />
      </div>
    </div>
  );
};
export default EventDetails;
