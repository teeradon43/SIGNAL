import firestore, { auth } from "../../database/firebase";
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { Link, useHistory,} from "react-router-dom"
import '../../App.css'
import "./css/UserDetails.css";
import "./css/EditUser.css";

const EditUser=(params)=>{
  const [users, setUsers] = useState({});
  const [visitor, setVisitor] = useState(null);

  function handleSave() {
    //help here
  }
  function handlePic() {
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
        <form>
          <div className="row">
            <div className="col-2">
              Name:
            </div>
            <div className="col-6">
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Enter display name"
                maxLength="100"
                defaultValue={users.displayName}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              Pic:
            </div>
            <div className="col-6 test-picture">
              <img
                src={users.img}
                alt={users.img}
                height="100px"
                width="100px"
              />
              <br></br>
              <button onClick={handlePic}>change picture</button>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              Faculty:
            </div>
            <div className="col-6">
              <div className="form-group">
                <select defaultValue={users.faculty} name="Faculty" id="Faculty" className="form-control">
                  <option value={""}></option>
                  <option value={"Engineering"}>Engineering</option>
                  <option value={"Art"}>Art</option>
                  <option value={"Law"}>Law</option>
                  <option value={"Agriculture"}>Agriculture</option>
                  <option value={"Architecture"}>Architecture</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              Interest(s):
            </div>
            <div className="col-6">
              tag
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              Preview
            </div>
            <div
              className="container"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="Card black-text">
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
                  </h5>
                  <h5>Faculty : {users.faculty} </h5>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleSave}>Save</button>
        </form>
      </div> 
    </div>
  );
};
export default EditUser;