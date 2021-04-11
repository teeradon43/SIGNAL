import React from "react";

import firestore from "../../database/firebase";
import { Link } from "react-router-dom";

const MainPage = () => {
  const createEventHandler = () => {
    //TODO:Redirect to createEvent
  };
  //TODO:fetch data from firebase and tranform eventID to eventDetail

  //where should detail fetch
  class Event extends React.Component {
    constructor(props) {
      super(props);
      this.state = { ID: this.props.ID };
    }
    fetchData() {}
    //TODO:add onclick redirect
    render() {
      return (
        <div className="jumbotron">
          <div className="row">
            <div className="col-2">img here</div>
            <div className="col-4">
              <div>2222</div>
              <div>name</div>
              <div>des</div>
            </div>
          </div>
        </div>
      );
    }
  }
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
            <div class="events">
              <Link to={`/${events.id}`}>
                <h3>{events.eventName}</h3>
              </Link>

              <p>{events["description"]}</p>
            </div>
          ))}
        </div>
      );
    }
  }
  return (
    <div class="container-fluid">
      <div>
        <button onClick={createEventHandler}>Create Event</button>
      </div>
      <div>
        <EventsListDisplay />
      </div>
    </div>
  );
};

export default MainPage;
