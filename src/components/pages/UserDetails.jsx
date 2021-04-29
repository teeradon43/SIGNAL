import firestore, { auth } from "../../database/firebase";
import { useState, useEffect } from "react";
import "./css/UserDetails.css";
import { useParams } from "react-router";
import {Link} from 'react-router-dom';

const UserDetails = (params) => {
  const [users, setUsers] = useState({});
  const [visitor, setVisitor] = useState(null);

  function handleClick(e) {
    switch (e) {
      case "edit": {
        console.log("edit");
        break;
      }
      case "create": {
        console.log("create");
        break;
      }
      case "follow": {
        //TODO: If followed switch to unfollow
        console.log("follow");
        break;
      }
      case "rate": {
        console.log("rate");
        break;
      }
      default:
        console.log("Hello");
    }
  }

  const OwnerButton = () => {
    if (users.uid === visitor) {
      return (
        <div>
          <button onClick={() => handleClick("create")}>New Post</button>
          <button onClick={() => handleClick("edit")}>Edit Profile</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={() => handleClick("follow")}>Follow</button>
          <button onClick={() => handleClick("rate")}>Rate this user</button>
        </div>
      );
    }
  };

  async function fetchUser() {
    const userId = params.match.params.userId;
    const res = await firestore
      .collection("users")
      .doc(userId)
      .get()
      .then((snapshot) => {
        setUsers(snapshot.data());
        const authState = auth.onAuthStateChanged((user) => {
          if (user) setVisitor(user.uid);
        });
      })
      .catch((err) => {
        alert("ERROR: ", err.message);
      });
  }

  useEffect(() => {
    fetchUser();
  }, []);

  //TODO: get user created post , rating , if stranger : don't show edit , show report button , if own profile : show edit no report
  //TODO: add edit profile function
  //TODO: CSS UserDetails
  return (
    <div className="App-skeleton-ground">
      <div
        className="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="Card" style={{ marginRight: "15vw" }}>
          <div className="upper-container">
            <div className="image-container">
              <img
                src={users.img}
                alt={users.img}
                height="100px"
                width="100px"
              />
            </div>
          </div>
          <div className="lower-container">
            <h3> {users.displayName} </h3>
            <h5>
              {" "}
              My Interest : {users.interests}
              <button>+</button>
            </h5>
            <h5>Faculty : {users.faculty} </h5>
            <OwnerButton />
          </div>
        </div>
        <MyEvents />
      </div>
    </div>
  );
};
export default UserDetails;

const MyEvents = () => {
  const { userId } = useParams();
  const usersRef = firestore.collection("users");
  const postsRef = firestore.collection("events");

  const [state, setState] = useState("fetching");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    usersRef
      .doc(userId)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          setState("failed");
          return;
        }
        postsRef
          .where("uid", "==", userId)
          .get()
          .then((snapshot) => {
            let tempPosts = [];
            snapshot.forEach((doc) => {
              tempPosts = [...tempPosts, 
                {
                id: doc.id,...doc.data()
              }];
            });
            setPosts(tempPosts);
            setState("success");
          })
          .catch((err) => {
            setState("failed");
            console.log("Fetch posts error: ", err);
          });
      })
      .catch((err) => {
        setState("failed");
        console.log("Fetch user error: ", err);
      });
  }, []);

  console.log(posts);

  const EventCard = ({event}) =>{//use same component from main (EventListDisplay)
    return (
      <div style={{"background-color": "#2d314d"}} className="rounded p-1 mb-3 mt-1" key={event.id}>
        <Link to={`/events/${event.id}`}>
          <h3>{event.title}</h3>
        </Link>
        <p>{event.description}</p>
      </div>
    );
  }

  if (state === "fetching") {
    return <div>Fetching...</div>;
  } else if (state === "failed") {
    return <div>No user</div>;
  } else {
    return (
      <div>
        <h1 style={{ color: "white", marginBottom: "40px" }}> My Events </h1>
        <ul style={{ color: "white" }} className="list-unstyled">
          {posts.length ? (
            posts.map((post) => {
              return (
                <li key={post.id}> 
                  <EventCard event={post}/> 
                </li>
              );
            })
          ) : (
            <div> User has yet to created an event </div>
          )}
        </ul>
      </div>
    );
  }
};
