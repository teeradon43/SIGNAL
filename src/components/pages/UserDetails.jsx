import React, { Component, useEffect, useState } from "react";
import firestore, { auth } from "../../database/firebase";
import './css/UserDetails.css';

class UserDetails extends Component {
  state = {
    users: {},
  };
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    firestore
      .collection("users")
      .doc(params.userId)
      .get()
      .then((snapshot) => {
        this.setState({
          users: snapshot.data(),
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  render() {
    const { users } = this.state;

    //TODO: get user created post , rating , if stranger : don't show edit , show report button , if own profile : show edit no report
    //TODO: add edit profile function
    //TODO: CSS UserDetails
    // * ? should we add delete account button ?
    return (
      <div className="Card">
            <div className="upper-container">
                <div className="image-container">
                    <img src={users.photoURL} alt={users.photoURL} height="100px" width="100px"/>
                </div>
            </div>
            <div className="lower-container">
                <h3> {users.displayName} </h3>
                <h5> My Interest : {users.interests}
                    <button>+</button> 
                </h5>
                <h5>Faculty :  {users.faculty} </h5>
            <button>Edit Profile</button>
            <button>Delete Account</button>
            </div>
        </div>
    );
  }
}

export default UserDetails;
