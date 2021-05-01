import firestore, { auth } from "../../database/firebase";
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { Link, useHistory,} from "react-router-dom"
import '../../App.css'

const EditUser=(params)=>{
  const [users, setUsers] = useState({});
  const [visitor, setVisitor] = useState(null);

  function handleSave(data) {
    //help here
  }
  async function FetchUser() {
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
    FetchUser();
  }, []);
  return(
    <div className="App-skeleton-ground">
      <div className="App-skeleton-bg">
        <div className="row">
          <div className="col-2">
            Name:
          </div>
          <div className="col-6">
            {users.displayName}
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            Pic:
          </div>
          <div className="col-6">
            <img
                src={users.img}
                alt={users.img}
                height="100px"
                width="100px"
              />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            Faculty:
          </div>
          <div className="col-6">
            ...
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            Interest(s):
          </div>
          <div className="col-6">
            {users.interests}
            <button>+</button>
          </div>
        </div>
        <button onClick={handleSave}>Save</button>
      </div> 
    </div>
  );
};
export default EditUser;