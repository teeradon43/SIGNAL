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
import validate from "../formValidate";
import useForm from "../useForm";
import { UpdateEvent } from "../models/events";

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

function EditPost({submitForm}) {
  const [post, setPost] = useState({});
  const history = useHistory();
  const { handleChange, onImageChange, handleSubmit, input, errors } = useForm(
    submitForm,
    validate,
  ); 

  function handleClick() {
    history.push("/");
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
          Create Event{" "}
        </h1>
      </div>
      <div className="App-skeleton-bg" onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ width: "30vw" }}>
            <form style={{ marginBottom: "30px" }} onSubmit={handleSubmit}>
              <h3> Event Title </h3>
              <div className="webflow-style-input">
                <input
                  name="title"
                  type="text"
                  placeholder="Board Game Food Party"
                  maxLength="100"
                  minLength="5"
                  onChange={handleChange}
                  value={post.title}
                  required
                ></input>
                {errors.title && <p style={{ marginTop: "10px", color: "#ff9797"}}>{errors.title}</p>}
              </div>
              <h3 style={{ marginTop: "25px" }}> Event Description </h3>
              <textarea
                style={{ whiteSpace: "pre-wrap" }}
                name="description"
                className="App-skeleton-textareadesc"
                placeholder="Rule: No anime."
                onChange={handleChange}
                value={post.description}
              />
              {errors.description && <p style={{ marginTop: "10px", color: "#ff9797"}}>{errors.description}</p>}
            </form>
            <TagsJSX />
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
                name="maxAttendee"
                type="number"
                pattern="[1-9]|[1-9][0-9]"
                placeholder="5"
                maxLength="2"
                onChange={handleChange}
                value={post.maxAttendee}
                required
              ></input>
              {errors.maxAttendee && <p style={{ marginTop: "10px", color: "#ff9797"}}>{errors.maxAttendee}</p>}
            </div>
            <h4 style={{ marginTop: "40px" }}> Cost </h4>
            <div className="webflow-style-input1">
              <input
                name="cost"
                type="number"
                pattern="[1-9]|[1-9]([0-9]{1-3})"
                placeholder="690"
                maxLength="4"
                onChange={handleChange}
                value={post.cost}
                required
              ></input>
              {errors.cost && <p style={{ marginTop: "10px", color: "#ff9797"}}>{errors.cost}</p>}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "30px",
          width: "80vw",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Cancel onClick={handleClick}> Cancel </Cancel>
        <Button onClick={handleSubmit} style={{ marginLeft: "20px" }}>
          {" "}
          Update{" "}
        </Button>
      </div>
    </div>
  );
}

export default EditPost;
