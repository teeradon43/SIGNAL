import firestore from "../../database/firebase";
import firebase from "firebase/app";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { storage } from "../../database/firebase";
// ------------- Upload Image -------------//
export const validateFileExtension = (fileName) => {
  //Edit from https://stackoverflow.com/a/4237161
  const validFileExtensions = [".jpg", ".jpeg", ".png"];
  if (fileName.length > 0) {
    for (let j = 0; j < validFileExtensions.length; j++) {
      const currentExtension = validFileExtensions[j];
      if (
        fileName
          .substr(
            fileName.length - currentExtension.length,
            currentExtension.length
          )
          .toLowerCase() == currentExtension.toLowerCase()
      ) {
        return true;
      }
    }
    alert(
      "Sorry, " +
        fileName +
        " is invalid, allowed extensions are: " +
        validFileExtensions.join(", ")
    );
    return false;
  }
  return true; //no file: should it be false?
};
const uploadEventImage = async (file, userID, eventID) => {
  //TODO: COMPRESS FILE BEFORE UPLOAD
  console.log("Upload to: ", eventID);
  if (file) {
    const eventImageBucket = storage.child("EventImages");
    const fileName = file.name;
    let indexOfExtension = fileName.lastIndexOf(".");
    const extension = fileName.substr(indexOfExtension, fileName.length);
    console.log(extension);
    if (!validateFileExtension(fileName)) {
      console.log(`Bad file extension`);
    } else {
      const targetRef = eventImageBucket
        .child(userID)
        .child(eventID + extension); //upload as /userID/eventID.extension
      targetRef
        .put(file)
        .then((res) => {
          //console.log(res)
          res.ref
            .getDownloadURL()
            .then((photoURL) => {
              firestore
                .collection("events")
                .doc(eventID)
                .update({
                  img: photoURL,
                })
                .then(() =>
                  console.log("Update image url successful: ", photoURL)
                )
                .catch((e) => console.log("update image url failed: ", e));
            })
            .catch((err) => console.log(`Can't get DownloadURL: ${err}`));
        })
        .catch((err) => {
          console.log(`Can't upload: ${err}`);
        });
    }
  } else {
    console.log("no file");
  }
};

// ------------- Create Event ----------- //
export const CreateEvent = (params) => {
  //TODO: REDIRECT FIX VALUE PARSE AND ADD TO CREATED EVENT IN USER
  const event = {
    uid: params.uid,
    title: params.title,
    description: params.description,
    date: params.date, // go go calendar
    dateCreated: new Date(),
    maxAttendee: parseInt(params.maxAttendee, 10),
    noAttendee: 0,
    attendeeList: [],
    cost: parseInt(params.cost, 10),
    isDeleted: false,
    img: params.img,
    noReported: 0,
    adminDeleted: false,
    tags: params.tags,
    rating: [],
    comment: [],
  };

  let eventID = "";
  firestore
    .collection("events")
    .add({
      uid: event.uid,
      title: event.title,
      description: event.description,
      date: event.date,
      dateCreated: event.dateCreated,
      maxAttendee: parseInt(event.maxAttendee, 10),
      noAttendee: event.noAttendee,
      attendeeList: event.attendeeList,
      cost: parseInt(event.cost, 10),
      isDeleted: event.isDeleted,
      img: "", //placeholder before upload
      noReported: event.noReported,
      adminDeleted: event.adminDeleted,
      tags: event.tags,
      rating: event.rating,
      comment: event.comment,
    })
    .then((docRef) => {
      console.log("event id: ", docRef.id);
      uploadEventImage(event.img, event.uid, docRef.id); //upload image and set imageURL
      JoinEvent(docRef.id, params.uid);
      alert("You have created a new event!");
    })
    .catch((e) => {
      console.log("Error in upload data: ", e);
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
  alert("Cancel Successfully.");
};

//------------- Delete Event ----------- //
export const DeleteEvent = (eventId) => {
  const eventRef = firestore.collection("events").doc(eventId);
  eventRef.update({
    isDeleted: true,
  });
};
