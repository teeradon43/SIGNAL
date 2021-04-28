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
      uid: event.uid,
      title: event.title,
      description: event.description,
      date: event.date,
      dateCreated: event.dateCreated,
      maxAttendee: event.maxAttendee,
      noAttendee: event.noAttendee,
      attendeeList: event.attendeeList,
      cost: event.cost,
      img: event.img,
      noReported: event.noReported,
      adminDeleted: event.adminDeleted,
      tags: event.tags,
      rating: event.rating,
      comment: event.comment,
    })
    .then(function (docRef) {
      JoinEvent(docRef.id, params.uid);
      alert("You have created a new event!");
    })
    .catch((e) => {
      alert("Error", e);
    });
};

//------------- Update Event ----------- //
export const UpdateEvent = (eventId, params) => {
  // event reference
  const eventRef = firestore.collection("event").doc(eventId);
  // update event with params
  eventRef.update({
    title: params.title,
    description: params.description,
    date: params.date,
    maxAttendee: params.maxAttendee,
    cost: params.cost,
    img: params.img,
    tags: params.tags,
  });
};

//------------------ RELOCATE ---------------//
export const RelocateEvent = (eventId, eventParam) => {
  const eventRef = firestore.collection("events").doc(eventId);
  eventRef.update({
    uid: eventParam.uid,
    title: eventParam.title,
    description: eventParam.description,
    date: eventParam.date,
    dateCreated: eventParam.dateCreated,
    maxAttendee: eventParam.maxAttendee,
    noAttendee: eventParam.noAttendee,
    attendeeList: eventParam.attendeeList,
    cost: eventParam.cost,
    img: eventParam.img,
    noReported: eventParam.noReported,
    adminDeleted: eventParam.adminDeleted,
    tags: eventParam.tags,
    rating: eventParam.rating,
    comment: eventParam.comment,
  });
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
  //update eventHistory
  userRef.update({
    eventHistory: firebase.firestore.FieldValue.arrayUnion(eventId),
  });
};

//------------- Event Add User ----------- //
const AddUserToEvent = (eventId, userId) => {
  //event reference
  const eventRef = firestore.collection("events").doc(eventId);
  //update event
  eventRef.update({
    attendeeList: firebase.firestore.FieldValue.arrayUnion(userId),
    noAttendee: firebase.firestore.FieldValue.increment(1),
  });
};

//------------- Join Event ----------- //
export const JoinEvent = (eventId, userId) => {
  AddEventToUser(eventId, userId);
  AddUserToEvent(eventId, userId);
  alert("Join Success!");
};

//------------- Event Del User ----------- //
const DelUserFromEvent = (eventId, userId) => {
  //event reference
  const eventRef = firestore.collection("events").doc(eventId);
  //update History
  eventRef.update({
    attendeeList: firebase.firestore.FieldValue.arrayRemove(userId),
    noAttendee: firebase.firestore.FieldValue.increment(-1),
  });
};

//------------- User Del Event ----------- //
const DelEventFromUser = (eventId, userId) => {
  //user reference
  const userRef = firestore.collection("users").doc(userId);
  //update eventHistory
  userRef.update({
    eventHistory: firebase.firestore.FieldValue.arrayRemove(eventId),
  });
};

//------------- Quit Event ----------- //
export const QuitEvent = (eventId, userId) => {
  DelUserFromEvent(eventId, userId);
  DelEventFromUser(eventId, userId);
};
