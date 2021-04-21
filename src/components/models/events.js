import firestore from "../../database/firebase";
import { useState, useEffect } from "react";

export const CreateEvent = (
  uid,
  title,
  description,
  date,
  maxAttendee,
  cost,
  img,
  tags
) => {
  // if(isValid(uid,title,date,maxAttendee,cost)){
  const event = [
    {
      uid: uid,
      title: title,
      description: description,
      date: date, // go go calendar
      dateCreated: new Date().toLocaleDateString(),
      maxAttendee: maxAttendee,
      noAttendee: 0,
      attendeeList: [],
      cost: cost,
      img: img,
      noReported: 0,
      adminDeleted: false,
      tags: tags,
      rating: [],
      comment: [],
    },
  ];
  firestore
    .collection("events")
    .add({
      event,
    })
    .then(() => {
      alert("Success");
    })
    .catch((e) => {
      alert("Error", e);
    });

  // }
};

function isValid(uid, title, date, maxAttendee, cost) {
  if (
    uid === "" ||
    title === "" /* || date < new Date */ ||
    maxAttendee < 1 ||
    cost < 0
  ) {
    alert("One or more field is incorrect or invalid. Please try again.");
    return 0;
  } else {
    return 1;
  }
}

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
