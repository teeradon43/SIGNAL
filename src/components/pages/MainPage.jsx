import { useHistory } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import "../../App.css";
import "./css/MainPage.css";
import firestore from "../../database/firebase";
import { Link } from "react-router-dom";
import id from "date-fns/esm/locale/id/index.js";

const MainPage = () => {
  const history = useHistory();
  const createEventHandler = () => {
    history.push("/create-post");
  };
  //const EventsListDisplay = () => {
  class EventsListDisplay extends Component {
    //const [events,setEvents] = useState([]);
    state = { events: [], users: [] };
    /*useEffect(()=>{
      firestore
        .collection("events")
        .get()
        .then((snapshot) => {
          const events = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setEvents({
            events,
          });
        });
    });*/
    componentDidMount() {
      firestore
        .collection("events")
        .where("adminDeleted", "==", false)
        .orderBy("dateCreated", "desc") //sort by newest post
        .onSnapshot((snapshot) => {
          if (snapshot) {
            const events = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(), //new event return as object event
              };
            });
            this.setState({
              events: events,
            });
          }
        });

      firestore
        .collection("users")
        .get()
        .then((snapshot) => {
          if (snapshot) {
            const users = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            });
            this.setState({ users: users });
          }
        });
    }
    render() {
      const { events } = this.state;
      const { users } = this.state;
      return (
        <div>
          {events.map((events) => (
            <div className="events" key={events.id}>
              <div className="event-description">
                <div className="event-description-left">
                  <p style={{ color: "green", cursor: "default" }}>
                    {events.date.length
                      ? events.date.substring(8, 10) +
                        " / " +
                        events.date.substring(5, 7) +
                        " / " +
                        events.date.substring(0, 4)
                      : "ไม่ได้กำหนดวันกิจกรรม"}
                  </p>
                  <Link to={`/events/${events.id}`}>
                    <h3 className="event-description-left-desc">
                      {events.title}
                    </h3>
                  </Link>
                  <p className="event-description-left-desc">
                    {events["description"]}
                  </p>
                </div>
                <div className="event-description-right">
                  <p>
                    {events.noAttendee} / {events.maxAttendee}
                  </p>
                </div>
              </div>
              <div className="host">
                <p className="host-name">
                  Author : {"  "}
                  {/* <img
                    className="host-profile"
                    src={
                      users[users.findIndex((x) => x.uid === events.uid)]
                        ? users[users.findIndex((x) => x.uid === events.uid)]
                            .img
                        : "fetching.."
                    }
                  /> */}
                  {users[users.findIndex((x) => x.uid === events.uid)]
                    ? users[users.findIndex((x) => x.uid === events.uid)]
                        .displayName
                    : "fetching.."}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
  //TODO:make it more functionable
  //TODO:edit create event area
  return (
    <div className="App-skeleton-ground">
      <div className="App-skeleton-bg">
        <div className="create-container">
          <p>
            Didn't find anything interest? Let's create some! {"    "}
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={createEventHandler}
            >
              Create Event
            </button>
          </p>
        </div>
        <div>
          <EventsListDisplay />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
