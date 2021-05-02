import firestore, { auth } from "../../database/firebase";
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { Link, useHistory,} from "react-router-dom"
import '../../App.css'

const EditUser=(params)=>{
  const [users, setUsers] = useState({});
  const [visitor, setVisitor] = useState(null);

  function handleSave() {
    //help here
  }
  function handlePic() {
    
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
            <div className="col-3">
              Name:
            </div>
            <div className="col-6">
              {users.displayName}
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              Profile Picture:
            </div>
            <div className="col-6" style={{ marginTop: "10px"}}>
              <img
                src={users.img}
                alt={users.img}
                height="100px"
                width="100px"
              />
              <br></br>
              <button className="btn btn-outline-light" onClick={handlePic} style={{ marginTop: "10px"}}>change picture</button>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              Faculty:
            </div>
            <div className="col-6" style={{ marginTop: "10px"}}>
              <div className="form-group">
                <select defaultValue={"-"} name="Faculty" id="Faculty" className="form-control">
                  <option value={"-"}>-</option>
                  <option value={"Engineering"}>Engineering</option>
                  <option value={"Art"}>Art</option>
                  <option value={"Law"}>Law</option>
                  <option value={"Agriculture"}>Agriculture</option>
                  <option value={"Architecture"}>Architecture</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: "10px"}}>
            <div className="col-3">
              Interest(s):
            </div>
            <div className="col-6">
              {users.interests}
              <button className="btn btn-outline-warning">+</button>
            </div>
          </div>
          <button className="btn btn-outline-success" onClick={handleSave} style={{ marginTop: "10px"}}>Save</button>
        </form>
      </div> 
    </div>
  );
};
export default EditUser;