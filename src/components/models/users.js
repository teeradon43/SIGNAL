import { useState, useEffect } from "react";
import firestore from "../../database/firebase";
import firebase from "firebase/app";
import { Redirect } from "react-router-dom";
import { storage } from "../../database/firebase";

export const GetUser = async (uid) => {
  const [user, setUser] = useState();
  const res = await firestore
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => {
      const user = snapshot.data();
      setUser(user);
    })
    .catch((err) => alert("ERROR: ", err));
  return user;
};
//from events.js
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
const uploadUserImage = async (file, userID) => {
  //TODO: COMPRESS FILE BEFORE UPLOAD
  console.log("Upload to: ", userID);
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
        .child(userID + extension)//upload as /userID/eventID.extension
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
export const UpdateUser = (userId, params) => {
  const userRef = firestore.collection("event").doc(userId);
  userRef.update({
    name: params.name,
    facutly: params.facutly,
    img: params.img,
    interests: params.interests,
  });
};