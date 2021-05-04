import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import firestore from "../../database/firebase";

import "../../App.css";
import "../../Webflow.scss";
import "../../Tags.scss";
import styled from "styled-components";
import { ReactComponent as LogoP } from "../../images/pictures.svg";
import { UpdateEvent } from "../models/events";

import "../../Tags.scss";

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

const EditPost = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const eid = useParams().eventId;
  const [event, setEvent] = useState();

  const [tags, setTags] = useState(["Event"]);
  const [img, setImg] = useState(null);

  useEffect(() => {
    //first time only: set minimum date to today
    //XXX: https://stackoverflow.com/questions/50718968/how-do-i-disable-dates-till-current-date-for-input-type-datetime-local/50719733
    let elem = document.getElementById("eventDate");
    let iso = new Date().toISOString();
    let minDate = iso.substring(0, iso.length - 1);
    elem.value = minDate;
    elem.min = minDate;
  }, []);

  useEffect(() => {
    firestore
      .collection("events")
      .doc(eid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const event = doc.data();
          setEvent(event);
        }
      });
  }, [eid]);

  const onSubmit = (data) => {
    console.log(data);
    console.log(eid);
    UpdateEvent(eid, data);
    alert("Update Success");
    history.push(`/events/${eid}`);
  };

  function handleCancel(e) {
    history.push("/");
    e.preventDefault();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-flex">
              <div style={{ width: "30vw" }}>
                <h3> Event Title </h3>
                <div className="webflow-style-input">
                  <input
                    defaultValue={event ? event.title : ""}
                    {...register("title", {
                      required: true,
                      minLength: 5,
                      maxLength: 100,
                    })}
                  />
                  {errors.title && errors.title.type == "required" && (
                    <p>This field is required</p>
                  )}
                  {errors.title && errors.title.type == "minLength" && (
                    <span>Title must have more than 5 characters</span>
                  )}
                  {errors.title && errors.title.type == "maxLength" && (
                    <span>Title is too long</span>
                  )}
                </div>
                <h3 style={{ marginTop: "25px" }}> Event Description </h3>
                <textarea
                  className="App-skeleton-textareadesc"
                  style={{ whiteSpace: "pre-wrap", alignSelf: "flex-start" }}
                  defaultValue={event ? event.description : ""}
                  {...register("description", {
                    maxLength: 3000,
                  })}
                />
                {errors.description &&
                  errors.description.type == "maxLength" && (
                    <span>Description is too long</span>
                  )}
                <TagsJSX tags={tags} setTags={setTags} />
              </div>
              <div style={{ width: "15vw" }}>
                <div style={{ display: "flex" }}>
                  <Thumbnail
                  // onImageChange={onImageChange}
                  // img={img}
                  // value={input.img}
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <label htmlFor="date" className="mr-2">
                    Event Date
                  </label>
                  <input
                    type="hidden"
                    id="timezone"
                    name="timezone"
                    value="+07:00"
                  />
                  {/*Can be use to tell timezone (must be added manually)*/}
                  <input
                    name="date"
                    id="eventDate"
                    type="datetime-local"
                    className="form-control"
                    // onChange={handleChange}
                    required
                  />
                </div>
                <h4 style={{ marginTop: "30px" }}> Max Attendee </h4>
                <div className="webflow-style-input1">
                  <input
                    type="number"
                    defaultValue={event ? event.maxAttendee : ""}
                    {...register("maxAttendee", {
                      required: true,
                      min: 1,
                    })}
                  />
                  {errors.maxAttendee &&
                    errors.maxAttendee.type == "required" && (
                      <p>Number of Attendee is required</p>
                    )}
                  {errors.maxAttendee && errors.maxAttendee.type == "min" && (
                    <p> Number of Attendee must have more than 0</p>
                  )}
                </div>
                <h4 style={{ marginTop: "40px" }}> Cost </h4>
                <div className="webflow-style-input1">
                  <input
                    type="number"
                    defaultValue={event ? event.cost : ""}
                    {...register("cost", {
                      required: true,
                      min: 0,
                    })}
                  />
                  {errors.cost && errors.cost.type == "required" && (
                    <p>Cost is required</p>
                  )}
                  {errors.cost && errors.cost.type == "min" && (
                    <p>Cost must not be negative</p>
                  )}
                  
                </div>
                <div className="form-button" style={{display: "flex"}}>
                    <Cancel onClick={handleCancel} style={{marginRight: "20px"}}>Cancel</Cancel>{" "}
                    <Button className="webflow-style-input1">
                      <input type="submit" />
                    </Button>
                  </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

const TagsJSX = ({ tags, setTags }) => {
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  const checkSameTags = (event) => {
    for (var i = 0; i < tags.length; i++) {
      if (event.target.value === tags[i]) {
        return null;
      }
    }
    addTags(event);
  };

  return (
    <div className="App">
      <div className="tags-input">
        <ul id="tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span
                className="tag-close-icon"
                onClick={() => removeTags(index)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyUp={(event) =>
            event.key === "Enter" && tags.length < 6
              ? checkSameTags(event)
              : null
          }
          placeholder="Press enter to add tags"
        />
      </div>
    </div>
  );
};

const Thumbnail = ({ onImageChange, img }) => {
  return (
    <div>
      <div>
        <div>
          <label htmlFor="myPicture" style={{ display: "flex" }}>
            <LogoP
              style={{ cursor: "pointer", width: "30px", height: "30px" }}
            />
            <h4 style={{ marginLeft: "1vw" }}> Upload Photo </h4>
          </label>
          <input
            id="myPicture"
            name="img"
            type="file"
            style={{ display: "none" }}
            onChange={onImageChange}
          />
        </div>
        {img ? (
          <img
            src={URL.createObjectURL(img)}
            style={{
              width: "10vw",
              cursor: "default",
              borderRadius: "4px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
            alt="event image"
          />
        ) : null}
      </div>
    </div>
  );
};
