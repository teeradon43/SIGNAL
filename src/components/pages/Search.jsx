import firestore from "../../database/firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = (params) => {
  const [text, setText] = useState(params.match.params.searchText);
  const [event, setEvent] = useState([]);
  const [filtEvent, setFilt] = useState([]);
  const [isLoad, setLoad] = useState(false);

  function fetchEvent() {
    console.log("fetching");
    firestore
      .collection("events")
      .orderBy("dateCreated", "desc")
      .onSnapshot((querySnapshot) => {
        const events = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setEvent(events);
        setLoad(true);
      });
  }

  useEffect(() => {
    fetchEvent();
    resetAndFind(text);
  }, [isLoad]);

  function resetAndFind(text) {
    console.log("run reset and find");
    console.log(event.length);
    setFilt([]);
    var pattern = text.toLowerCase();
    event.forEach((doc) => {
      var title = doc.title.toLowerCase();
      var desc = doc.description.toLowerCase();
      if (title.includes(pattern) || desc.includes(pattern))
        setFilt((filtEvent) => [...filtEvent, doc]);
    });
  }

  function handleChange(e) {
    setText(e.target.value);
    e.preventDefault();
  }
  function handleClick(e) {
    resetAndFind(text);
    e.preventDefault();
  }
  return (
    <div className="App-skeleton-ground">
      <div className="App-skeleton-bg">
        <form className="search-section" onSubmit={handleClick}>
          <label>
            <h2>Search</h2>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Enter search value"
              value={text}
            />
          </label>
          <input type="submit" value="Find" />
        </form>
        <div className="event-container">
          <h2>Result:</h2>
          {filtEvent.length ? (
            filtEvent.map((events) => (
              <div className="events" key={events.id}>
                <Link to={`/events/${events.id}`}>
                  <h3>{events.title}</h3>
                </Link>
                <p>{events["description"]}</p>
              </div>
            ))
          ) : (
            <div>We didn't find any results about "{text}" .</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
