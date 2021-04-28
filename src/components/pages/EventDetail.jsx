
import { useState, useEffect } from "react";
import firestore, { auth } from "../../database/firebase";
import "./css/EventDetail.css";
import "../../App.css";
import { JoinEvent } from "../models/events";
import { useHistory } from "react-router";

const EventDetails = (params) => {
  const [event, setEvent] = useState({});
  const [host, setHost] = useState({});
  const [uid, setUid] = useState("");
  const [visitor, setVisitor] = useState(null);
  const history = useHistory();

  const handleProfile = () => {
    history.push(`/u/${host.uid}`)
  }
  
  const handleEdit = () => {
    history.push(`/edit-post/78oKoFAhATxVaJAm5klZ`) // `/edit-post/${params.match.params.eventId}
  }

  const handleDelete = () => {
    history.push(`/`)
    alert('You successfully delete the post!')
  }
  
  const OwnerButton = (params) => {
    if (host.uid === visitor) {
      return (
        <div>
          <button type='button' className="join-btn"> Edit Event </button>
          <button type='button' className="report-btn"> Delete Event </button>
        </div>
      );
    } else {
      //TODO: If joined change to quit
      return (
        <div>
          <button type='button' className="join-btn"> Join Event </button>
          <button type='button' className="report-btn"> Report event </button>
        </div>
      );
    }
  };

  const HostButton = () => {
    return (
      <div>
        <button onClick={handleEdit} className="join-btn"> EDIT </button>
        <button onClick={handleDelete} className="report-btn"> DELETE </button>
      </div>
    );
  };

  function handleJoin() {
    //TODO: If already join switch to dismiss
    //TODO: Check if noAttendee == maxAttendee cannot join
    const eid = params.match.params.eventId;
    JoinEvent(eid, visitor);
  }

  const GuestButton = () => {
    return (
      <div>
        <button className="join-btn" onClick={handleJoin}>
          Join
        </button>{" "}
        {/* Cancel Join */}
        <button className="report-btn">Report</button>
      </div>
    );
  };

  async function fetchEvent() {
    const eid = params.match.params.eventId
    const res = await firestore
      .collection("events")
      .doc(eid)
      .get()
      .then((snapshot) => {
        const event = snapshot.data().event
        setEvent(event)
        setUid(event.uid)
      })
      .catch((err) => alert("ERROR: ", err))
  }

  async function fetchHost() {
    const userId = uid
    const res = await firestore
      .collection("users")
      .doc(userId)
      .get()
      .then((snapshot) => {
        const user = snapshot.data()
        setHost(user)
        const authState = auth.onAuthStateChanged((user) => {
          if (user) setVisitor(user.uid)
        });
      })
      .catch((err) => alert("ERROR: ", err))
  }

  useEffect(() => {
    fetchEvent()
  }, [])

  useEffect(() => {
    if (uid) fetchHost()
  })

  return (
    <div className="App-skeleton-ground" style={{ display: 'flex', justifyContent: 'center', height: 'calc(100vh - 80px)' }}>
      {/* Host Section */}
      <div className="host-detail">
        <h1 style={{ marginBottom: '40px' }}> Host Detail </h1>
        <div style={{ display: 'flex', marginBottom: '40px' }}>
          <img onClick={handleProfile} src={host.img} style={{ marginRight: '1vw', cursor: 'pointer' }} />
          <h4> {host.displayName} </h4>
        </div>
        <OwnerButton />
      </div>
      {/* Event Section */}
      <div className="event-detail">
        <h1 onClick={handleEdit} style={{ marginBottom: '40px' }}> {event.title} </h1>
        <p> {event.description} </p>
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
export default EventDetails
