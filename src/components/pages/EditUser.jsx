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
        </form>
      </div> 
    </div>
  );
};
export default EditUser;