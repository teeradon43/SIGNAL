import firestore, { auth, googleProvider } from "../../database/firebase";

auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // console.log(user);
    // console.log(user.uid);
  } else {
    // No user is signed in.
  }
});

export function login() {
  const result = auth
    .signInWithPopup(googleProvider)
    .then(() => {
      console.log("Login OK");
      console.log(result);
      //   const userRef = firestore.collection("users").doc(result.user.uid); // get current user with their UID
      //   userRef
      //     .get()
      //     .then((doc) => {
      //       //TODO: Change default value + link with follower
      //       if (!doc.data()) {
      //         //if user not found, create account for them
      //         userRef.set({
      //           userID: result.user.uid,
      //           displayName: result.user.displayName,
      //           name: "",
      //           surname: "",
      //           description: "",
      //           photoURL: result.user.photoURL,
      //           email: result.user.email,
      //           isAdmin: false,
      //           interests: [],
      //           createdEvents: [],
      //           dateJoined: new Date().valueOf(),
      //         });
      //       }
      //       console.log("Login Ok");
      //     })
      //     .catch((error) => {
      //       //Handle get user data error
      //       window.alert("Handle Data Error: " + error.message); // edit this later
      //     });
    })
    .catch((error) => {
      //Handle Errors
      var errorMessage = error.message;

      window.alert("Error: " + errorMessage);
    });
}

export function logout() {
  auth
    .signOut()
    .then(function () {
      // Sign out Ok.
      console.log("Logout OK");
    })
    .catch((error) => {
      //Handle errors
      var errorMessage = error.message;

      window.alert("Error: " + errorMessage);
    });
}
