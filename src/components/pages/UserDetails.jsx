import firestore, { auth } from "../../database/firebase";
import { useState, useEffect } from "react";
import "./css/UserDetails.css";

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
    <div className="Card">
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
  );
};
export default UserDetails;
