import firestore, { auth, googleProvider } from "../../database/firebase";

export function login() {
  auth
    .signInWithPopup(googleProvider)
    .then((result) => {
      console.log(result);
      var isKmitl = result.user.email;
      isKmitl = isKmitl.substring(isKmitl.indexOf("@") + 1);
      if (isKmitl != "kmitl.ac.th") {
        throw new Error("Only @kmitl.ac.th can login");
      } else {
        const userRef = firestore.collection("users").doc(result.user.uid); // get current user with their UID
        userRef
          .get()
          .then((doc) => {
            if (!doc.data()) {
              //if user not found, create account for them
              console.log("Login Ok");
              userRef.set({
                uid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                isAdmin: false,
                name: "",
                surname: "",
                faculty: "",
                interests: [],
                description: "",
                eventHistory: [],
                followings: [],
                followers: [],
                isBanned: false,
                img: result.user.photoURL,
                dateJoined: new Date().toLocaleDateString(),
                rating: [],
                notification: [],
              });
            }
            alert("Login Successful.\nWelcome", result.user.displayName);
          })
          .catch((error) => {
            //Handle get user data error
            window.alert("Handle Data Error: " + error.message); // edit this later
          });
      }
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
      alert("Logout Successful.\nHope to see you soon!");
    })
    .catch((error) => {
      //Handle errors
      var errorMessage = error.message;

      window.alert("Error: " + errorMessage);
    });
}
