import { useHistory } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import "../../App.css";
import "./css/MainPage.css";
import firestore from "../../database/firebase";
import { Link } from "react-router-dom";

const MainPage = () => {
  const history = useHistory();
  const createEventHandler = () => {
    history.push("/create-post");
  };
  //const EventsListDisplay = () => {
  class EventsListDisplay extends Component {
    //const [events,setEvents] = useState([]);
    state = { events: [] };
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
              events,
            });
          }
        });
    }
    /*return (
      <div>
        {[events].map((events) => (
          <div className="events" key={events.id}>
            <Link to={`/events/${events.id}`}>
              <h3>{events.eventName}</h3>
            </Link>
            <p>{events["description"]}</p>
          </div>
        ))}
      </div>
    );*/
    render() {
      const { events } = this.state;
      return (
        <div>
          {events.map((events) => (
            <div className="events" key={events.id}>
              <Link to={`/events/${events.id}`}>
                <h3>{events.title}</h3>
              </Link>
              <p>{events["description"]}</p>
              <p style={{ color: "green", cursor: "default" }}>
                {events.date.length
                  ? events.date.substring(8, 10) +
                    " / " +
                    events.date.substring(5, 7) +
                    " / " +
                    events.date.substring(0, 4)
                  : "ไม่ได้กำหนดวันกิจกรรม"}
              </p>
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
