
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useHistory, useParams } from "react-router-dom"
import '../../App.css'
import '../../Webflow.scss'
import '../../Tags.scss'
import { ReactComponent as LogoC } from '../../images/calendar.svg'
import Thumbnail from '../../Thumbnail'
import TagsJSX from '../../Tags'
import firestore from "../../database/firebase"

const Button = styled.button`
  background-color: #0077ff;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  font-size: 22px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #3f51b5;
  }
`;

const Cancel = styled.button`
  background-color: #ff3535;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  font-size: 22px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  transition: ease background-color 250ms;

  &:hover {
    background-color: #c02020;
  }
`;

function EditPost() {
  const [post, setPost] = useState({});
  const history = useHistory();

  function handleClick() {
    history.push("/");
  }

  function UsePost() {
    const [post, setPost] = useState([]);
    let { eventId } = useParams();
    useEffect(() => {
      firestore
        .collection("events")
        .doc(eventId)
        .get()
        .then((snapshot) => {
          setPost(snapshot.data());
        });
    }, []);
    return post;
  }

    function UsePost() {
        const [post, setPost] = useState([])
        let { eventId } = useParams();
        useEffect(() => {
            firestore
                .collection('events')
                .doc(eventId)
                .get()
                .then((snapshot) => {setPost(snapshot.data().event)})
                .catch((err) => alert("ERROR: ", err))
        }, [])
        return post
    }

  return (
    <div className="App-skeleton-ground">
      <div style={{ marginLeft: "auto", marginRight: "auto", width: "60vw" }}>
        <h1 style={{ color: "white", fontFamily: "PT Sans", fontSize: "50px" }}>
          {" "}
          Edit Event{" "}
        </h1>
      </div>
      <div className="App-skeleton-bg">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ width: "30vw" }}>
            <h3> Event Title </h3>
            <div className="webflow-style-input">
              <input
                type="text"
                placeholder={post.title}
                maxLength="100"
                minLength="5"
                required
              ></input>
            </div>
            <h3 style={{ marginTop: "25px" }}> Event Description </h3>
            <textarea
              className="App-skeleton-textareadesc"
              placeholder={post.description}
            />
          </div>
          <div style={{ width: "15vw" }}>
            <div style={{ display: "flex" }}>
              <Thumbnail />
            </div>
            <div style={{ display: "flex" }}>
              <Link to="/create-post/Calendar">
                <LogoC style={{ width: "30px" }} />
              </Link>
              <h4 style={{ marginLeft: "1vw" }}> Event Date </h4>
            </div>
            <h4 style={{ marginTop: "30px" }}> Max Attendee </h4>
            <div className="webflow-style-input1">
              <input
                type="text"
                pattern="[1-9]|[1-9][0-9]"
                placeholder={post.maxAttendee}
                maxLength="2"
                required
              ></input>
            </div>
            <h4 style={{ marginTop: "20px" }}> Cost </h4>
            <div
              className="webflow-style-input1"
              style={{ marginBottom: "30px" }}
            >
              <input
                type="text"
                pattern="[1-9]|[1-9]([0-9]{1-3})"
                placeholder={post.cost}
                maxLength="4"
                required
              ></input>
            </div>
            <TagsJSX />
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "30px",
          width: "80vw",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <Cancel onClick={handleClick}> Cancel </Cancel>
        <Button style={{ marginLeft: "20px" }}> Update </Button>
      </div>
    </div>
  );
}

export default EditPost;
