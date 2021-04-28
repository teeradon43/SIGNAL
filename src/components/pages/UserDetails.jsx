import firestore, { auth } from "../../database/firebase";
import { useState, useEffect } from "react";
import "./css/UserDetails.css";
import { useParams } from "react-router";

const UserDetails = (params) => {
  const [users, setUsers] = useState({});
  const [visitor, setVisitor] = useState(null);

  const OwnerButton = () => {
    if (users.uid === visitor) {
      return (
        <div>
          <button>Edit Profile</button>
          <button>Delete Account</button>
        </div>
      );
    } else {
      return (
        <div>
          <button>Follow</button>
          <button>Rate this user</button>
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
    <div className='App-skeleton-ground'>
      <div className="container" style={{ display: 'flex', justifyContent: 'center'}}>
        <div className="Card" style={{ marginRight: '15vw' }}>
          <div className="upper-container">
            <div className="image-container">
              <img src={users.img} alt={users.img} height="100px" width="100px" />
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
        <MyEvents/>
      </div>
    </div>
  );
};
export default UserDetails;

const MyEvents = ()=>{
  const {userId} = useParams();
  const usersRef = firestore.collection("users");
  const postsRef = firestore.collection("events");

  const [state,setState] = useState("fetching");
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    usersRef.doc(userId).get().then(doc=>{
      if(!doc.exists){
        setState("failed");
        return;
      }
      postsRef.where("event.uid","==",userId).get().then(snapshot=>{
        let tempPosts = []
        snapshot.forEach(doc=>{
          tempPosts = [...tempPosts, doc.data()];
        });
        setPosts(tempPosts);
        setState("success");
      }).catch(err=>{
        setState("failed");
        console.log("Fetch posts error: ",err)
      });
    }).catch(err=>{
      setState("failed");
      console.log("Fetch user error: ",err)
    });
  },[]);

  if(state==="fetching"){
    return (
      <div>
        Fetching...
      </div>);
  }
  else if(state==="failed"){
    return (
    <div>
      No user
    </div>);
  }
  else{
    return (
      <div>
        <h1 style={{ color: 'white', marginBottom: '40px' }}> My Events </h1>
        <ul style={{ color: 'white' }}>
          {posts.length ? posts.map(post=>{
            return (
              <li> {post.event.title} </li>
            );
          }):
          (
            <div> User has yet to created an event </div>
          )}
        </ul>
      </div>
    );
  }
  
}