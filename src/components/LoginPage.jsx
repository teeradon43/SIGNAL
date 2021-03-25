import { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router';
import firestore, {auth, googleProvider} from '../database/firebase';

/* Getting this error for now, it should work later without needing to fix tho
[2021-03-19T16:12:16.321Z]  @firebase/firestore: Firestore (8.3.0): Could not reach Cloud Firestore backend. Connection failed 1 times. Most recent error: FirebaseError: [code=permission-denied]: Cloud Firestore API has not been used in project 454115237023 before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=454115237023 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.
*/


const LoginPage = () => {
    let [user,setUser] = useState(null);
    const userRef = useRef(firestore.collection("users")).current;
    useEffect(()=>{ //fetch user data from firestore
        const authUnsubscribe = auth.onAuthStateChanged((firebaseUser)=>{
            if(firebaseUser){ //if the user already exist, put their data here
                userRef.doc(firebaseUser.uid).onSnapshot((doc)=>{
                    if(doc.data()){ //if the user already exist, put their data here
                        //TODO: Change userData
                        const userData={
                            uid: doc.data().uid,
                            displayName: doc.data().displayName,
                            photoURL: doc.data().photoURL,
                            email: doc.data().email,
                            created: doc.data().created,
                            role: doc.data().role
                        };
                        setUser(userData);
                    }
                    else{ //else set it to null(for rendering and display logic purpose)
                        setUser(null);
                    }
                })
            }
            else{ //else set it to null(for rendering and display logic purpose)
                setUser(null);
            }
        })
        return ()=>authUnsubscribe(); //unsubscribe when component unmount
    },[userRef])

    const googleLoginHandler = async () =>{
        const result = await auth.signInWithPopup(googleProvider);
        if(result){ //if login success
            const userRef = firestore.collection("users").doc(result.user.uid); // get current user with their UID
            userRef.get().then((doc)=>{
                //TODO: Change default value + link with follower
                if(!doc.data()){//if user not found, create account for them
                    userRef.set({
                        userID: result.user.uid,
                        displayName: result.user.displayName,
                        name: "",
                        surname: "",
                        description: "",
                        photoURL: result.user.photoURL,
                        email: result.user.email,
                        isAdmin: false,
                        interests: [],
                        createdEvents: [],
                        dateJoined: new Date().valueOf(),
                    })
                }

                //TODO: redirect user to main page here?

            }).catch((err)=>{
                console.log("Login error: "+err)
            });
        }
    }

    //May not need signoutHandler in this page
    const signOutHandler = () =>{
        auth.signOut().then(()=>{
            console.log("Logout OK")
        })
        .catch((err)=>{
            console.log("Logout Error: "+err);
        })
    }


    //TODO: This Redirect should work for now, maybe change it later
    //TODO: Consider removing Signout button?
    return ( 
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h1>SIGNAL</h1>
                </div>
                <div className="col-6">
                    {user ? (
                    <>
                        <button onClick={signOutHandler}>Signout</button>
                        <Redirect push to="main-page"/>
                    </>
                    ):<button onClick={googleLoginHandler}>Google Login</button>}
                </div>
            </div>
        </div>
     );
}
 
export default LoginPage;