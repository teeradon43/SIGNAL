import firestore, { auth } from "../../database/firebase";
import { useState, useEffect } from "react";
import "./css/UserDetails.css";
import { useParams } from "react-router";
import {Link} from 'react-router-dom';
import { useHistory } from "react-router";

const UserDetails = (params) => {
  const [users, setUsers] = useState({});
  const [visitor, setVisitor] = useState(null);
  const [rating, setRating] = useState(0);
  const history = useHistory();

  function handleClick(e) {
    switch (e) {
      case "edit": {
        console.log("edit");
        history.push(`/edit-user`);
        break;
      }
      case "create": {
        console.log("create");
        history.push("/create-post");
        break;
      }
      case "follow": {
        //TODO: If followed switch to unfollow
        console.log("follow");
        break;
      }
      case "rate": {
        history.push(`/review-user/${params.match.params.userId}`);
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
            <h5> My Score {rating===0 ? "N/A":rating+"/5"} </h5>
          </div>
        </div>
        <MyEvents />
      </div>
      <div className="container d-flex justify-content-center">
        <MyReviews score={rating} setScore={setRating}/>
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
          .orderBy("dateCreated","desc")
          .limit(5)
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

  //console.log(posts);

  const EventCard = ({event}) =>{//use same component from main (EventListDisplay)
    return (
      <div style={{backgroundColor: "#2d314d"}} className="rounded p-1 mb-3 mt-1" key={event.id}>
        <Link to={`/events/${event.id}`}>
          <h3>{event.title}</h3>
        </Link>
        <p>{event.description.length > 40 ? event.description.substr(0,70)+"...":event.description}</p>{/*may need text wrapping ref: https://stackoverflow.com/questions/16754608/cause-line-to-wrap-to-new-line-after-100-characters/16754732 */}
      </div>
    );
  }

  if (state === "fetching") {
    return <h3 style={{ color: "white" }}>Fetching...</h3>;
  } else if (state === "failed") {
    return <div style={{ color: "white" }}>No user</div>;
  } else {
    return (
      <div>
        <h1 style={{ color: "white", marginBottom: "20px" }}> My Events </h1>
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

const MyReviews = ({score, setScore}) =>{
  const { userId } = useParams();
  const [reviews, setReviews] = useState([]);
  //const [score, setScore] = useState(0);
  const [fetchState, setFetchState] = useState("fetching");

  const userReviewsRef = firestore.collection("users").doc(userId).collection("reviews");
  useEffect(()=>{
    userReviewsRef.get().then(docs=>{
      let tempReview = [];
      let tempScore = 0;
      //console.log(docs.size)
      if(docs.size > 0){
        docs.forEach(doc=>{
          tempScore += parseInt(doc.data().rating)
          tempReview = [...tempReview,{
            id: doc.id,
            ...doc.data()
          }]
        })
        setReviews(tempReview);
        setScore(tempScore/tempReview.length);
      }
      setFetchState("done");
    }).catch((err)=>{
      console.log(err)
      setFetchState("failed");
    })
  },[]);

  const ReviewCard = ({review}) =>{
    return (
        <div>
          <span style={{marginRight: "10px"}}>
              {review.rating}
          </span>    
          {review.description}
        </div>
    );
  }
  const ReviewList = ({reviews})=>{
    return (
      <ul className="list-unstyled">
        {reviews.map(review=>
        <li>
          <ReviewCard review={review}/>
        </li>)
        }
      </ul>
    );
  }

  if(fetchState==="fetching"){
    return(
      <div style={{color:"white"}}>
        <h3>Fetching...</h3>
      </div>
    );
  }
  else if(fetchState==="failed"){
    return (
      <div style={{color:"white"}}>
        <h3>Fetching failed</h3>
      </div>
    );
  }
  else{
    if(reviews.length <= 0){
      return(
        <div style={{color:"white"}}>
          <h1>This user has no review</h1>
        </div>
      );
    }
    else{
      return (
        <div style={{color:"white"}}>
          <h1>My Review</h1>
            <ReviewList reviews={reviews}/>
        </div>
      );
    }
  }
}