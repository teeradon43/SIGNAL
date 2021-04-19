import { useHistory } from "react-router-dom";
import React from "react";
import '../../App.css';
import "./css/MainPage.css";
import firestore from "../../database/firebase";
import { Link } from "react-router-dom";

const MainPage = () => {
  const history = useHistory();
  const createEventHandler = () => {
    history.push("/create-post");
  };
  class EventsListDisplay extends React.Component {
    state = { events: [] };
    componentDidMount() {
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
          this.setState({
            events,
          });
        });
    }
    render() {
      const { events } = this.state;
      return (
        <div>
          {events.map((events) => (
            <div>
              <div class="events">
                <Link to={`/events/${events.id}`}>
                  <h3>{events.eventName}</h3>
                </Link>
                <p>{events["description"]}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
  //TODO:add profile+edit sector
  //TODO:make it more functionable
  return (
    <div className="App-skeleton-ground">
      <div className="App-skeleton-bg">
        <button type="button" className="createEvents" onClick={createEventHandler}>Create Event</button>
        <div>
          <EventsListDisplay />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
