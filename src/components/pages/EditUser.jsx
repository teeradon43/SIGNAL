import firestore, { auth } from "../../database/firebase";
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { Link, useHistory,} from "react-router-dom"
import '../../App.css'
import "./css/UserDetails.css";
import "./css/EditUser.css";
import validate from "../formValidate";
import useForm from "../useForm";

const EditUser=({submitForm})=>{
  const [users, setUsers] = useState({});
  const [visitor, setVisitor] = useState(null);
  const history = useHistory();
  const { handleChange, handleSubmit, input, errors } = useForm(
    submitForm,
    validate,
  ); 
  function handleClick() {
    history.push("/");
  }
  /*async function fetchUser() {
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
  }, []);*/

  return(
    <div className="App-skeleton-ground">
      <div style={{ marginLeft: "auto", marginRight: "auto", width: "60vw" }}>
        <h1 style={{ color: "white", fontFamily: "PT Sans", fontSize: "50px" }}>
          {" "}
          Create Event{" "}
        </h1>
      </div>
      <div className="App-skeleton-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-3">
              Name:
            </div>
            <div className="col-6">
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Enter display name"
                maxLength="100"
                onChange={handleChange}
                defaultValue={users.displayName}
                required
              />
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
              <button className="btn btn-outline-light" style={{ marginTop: "10px"}}>change picture</button>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              Faculty:
            </div>
            <div className="col-6" style={{ marginTop: "10px"}}>
              <div className="form-group">
                <select defaultValue={users.faculty} name="Faculty" id="Faculty" className="form-control" onChange={handleChange}>
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
      <br/>
    </div>
  );
};
export default EditUser;