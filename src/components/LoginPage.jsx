import { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router';
import firestore, {auth, googleProvider} from '../database/firebase';

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
                        <Redirect push to="/main-page"/>
                    </>
                    ):<button onClick={googleLoginHandler}>Google Login</button>}
                </div>
            </div>
        </div>
     );
}
 
export default LoginPage;