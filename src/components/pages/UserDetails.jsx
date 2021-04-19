import React, { Component } from "react";
import firestore, { auth } from "../../database/firebase";

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
      <div className="container">
        <div className="user-detail">
          <img src={users.photoURL} alt={users.photoURL} />
          <h2>Name : {users.displayName}</h2>
          <p>
            My Interest : {users.interests}
            <button>+</button> {/* add interest */}
          </p>
          <p>Faculty : {users.faculty}</p>
        </div>
        <div className="user-function">
          <button className="btn btn-lg">Edit Profile</button>
          <button className="btn btn-lg">Delete Account</button>
        </div>
      </div>
    );
  }
}

export default UserDetails;
