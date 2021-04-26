import firestore from "../../database/firebase";
import firebase from "firebase/app";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// ------------- Create Event ----------- //
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
    .then(function (docRef) {
      // console.log("docRef =", docRef.id);
      // Host joined their event
      JoinEvent(docRef.id, params.uid);
      alert("You have created a new event!");
    })
    .catch((e) => {
      alert("Error", e);
    });
};

//------------- Update Event ----------- //
export const UpdateEvent = (eventId, params) => {
  // const baseEvent = GetEvent(eventId);
  // const event = {
  //   uid: params.uid,
  //   title: params.title,
  //   description: params.description,
  //   date: params.date, // go go calendar
  //   dateCreated: new Date(),
  //   maxAttendee: params.maxAttendee,
  //   noAttendee: 0,
  //   attendeeList: [],
  //   cost: params.cost,
  //   img: params.img,
  //   noReported: 0,
  //   adminDeleted: false,
  //   tags: params.tags,
  //   rating: [],
  //   comment: [],
  // };
};

//------------- Get Event Info ----------- //
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
  }, event);
  return event;
};

//------------- User Add Event ----------- //
const AddEventToUser = (eventId, userId) => {
  //user reference
  const userRef = firestore.collection("users").doc(userId);
  //update
  userRef.update({
    eventHistory: firebase.firestore.FieldValue.arrayUnion(eventId),
  });
};

//------------- Event Add User ----------- //
const AddUserToEvent = (eventId, userId) => {
  //event reference
  const eventRef = firestore.collection("events").doc(eventId);
  //update with dot notation
  eventRef.update({
    "event.attendeeList": firebase.firestore.FieldValue.arrayUnion(userId),
  });
};

//------------- Join Event ----------- //
export const JoinEvent = (eventId, userId) => {
  AddEventToUser(eventId, userId);
  AddUserToEvent(eventId, userId);
};

//------------- Event Del User ----------- //
const DelUserFromEvent = (eventId, userId) => {
  //event reference
  const eventRef = firestore.collection("events").doc(eventId);
  //update with dot notation
  eventRef.update({
    "event.attendeeList": firebase.firestore.FieldValue.arrayRemove(userId),
  });
};

//------------- User Del Event ----------- //
const DelEventFromUser = (eventId, userId) => {
  //user reference
  const userRef = firestore.collection("users").doc(userId);
  //update with dot notation
  userRef.update({
    eventHistory: firebase.firestore.FieldValue.arrayRemove(eventId),
  });
};

//------------- Quit Event ----------- //
export const QuitEvent = (eventId, userId) => {
  DelUserFromEvent(eventId, userId);
  DelEventFromUser(eventId, userId);
};
