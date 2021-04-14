import firestore, { auth, googleProvider } from "../../database/firebase";

export function login() {
  auth
    .signInWithPopup(googleProvider)
    .then((result) => {
      console.log(result);
      var isKmitl = result.user.email;
      isKmitl = isKmitl.substring(isKmitl.indexOf("@") + 1); 
      if(isKmitl != "kmitl.ac.th"){
        throw new Error("Only @kmitl.ac.th can login");
      }
      const userRef = firestore.collection("users").doc(result.user.uid); // get current user with their UID
      userRef
        .get()
        .then((doc) => {
          if (!doc.data()) {
            //if user not found, create account for them
            console.log("Login Ok");
            userRef.set({
              userID: result.user.uid,
              displayName: result.user.displayName,
              name: "",
              surname: "",
              description: "",
              photoURL: result.user.photoURL,
              email: result.user.email,
              isAdmin: false,
              isBanned: false,
              interests: [],
              createdEvents: [],
              dateJoined: new Date().valueOf(),
            });
          }
          console.log("Login Ok");
        })
        .catch((error) => {
          //Handle get user data error
          window.alert("Handle Data Error: " + error.message); // edit this later
        });
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
