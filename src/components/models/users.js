import { useState, useEffect } from "react";
import firestore from "../../database/firebase";

export const GetUser = (uid) => {
  const [user, setUser] = useState();
  useEffect(() => {
    firestore
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        console.log("found user", uid);
        setUser(snapshot.data());
      })
      .catch((e) => {
        alert(console.log("Error:", e));
      });
  });
  return user;
};
