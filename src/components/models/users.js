import { useState, useEffect } from "react";
import firestore from "../../database/firebase";

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
