import firestore from "../../database/firebase";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

export const CreateEvent = (params) => {
  //TODO: REDIRECT FIX VALUE PARSE AND ADD TO CREATED EVENT IN USER
  const event = {
    uid: params.uid,
    title: params.title,
    description: params.description,
    date: params.date, // go go calendar
    dateCreated: new Date(),
    maxAttendee: params.maxAttendee,
    noAttendee: 0,
    attendeeList: [],
    cost: params.cost,
    img: params.img,
    noReported: 0,
    adminDeleted: false,
    tags: params.tags,
    rating: [],
    comment: [],
  };

  firestore
    .collection("events")
    .add({
      event,
    })
    .then(() => {
      alert("You have created a new event!");
      return <Redirect to="/" />;
    })
    .catch((e) => {
      alert("Error", e);
    });

  // }
};

export const GetEvent = (eventId) => {
  const [event, setEvent] = useState();
  useEffect(() => {
    firestore
      .collection("events")
      .doc(eventId)
      .get()
      .then((snapshot) => {
        console.log("found event", eventId);
        setEvent(snapshot.data());
      })
      .catch((e) => {
        alert(console.log("Error:", e));
      });
  });
  return event;
};
