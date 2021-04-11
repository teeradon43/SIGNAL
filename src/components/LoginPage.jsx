import { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router';
import firestore, {auth, googleProvider} from '../database/firebase'; // remove this later
import './LoginPage.css';
import '../App.css';
import {login, logout} from './models/authv2';

const LoginPage = () => {

    let [user,setUser] = useState(null);
    const userRef = useRef(firestore.collection("users")).current;
    
    useEffect(()=>{ //fetch user data from firestore
        /* F0Nt is fixing
        const authUnsubscribe = auth.onAuthStateChanged((firebaseUser)=>{
            if(firebaseUser){ //if the user already exist, put their data here
                userRef.doc(firebaseUser.uid).onSnapshot((doc)=>{
                    if(doc.data()){ //if the user already exist, put their data here
                        //TODO: Change userData
                        const userData={
                            userID: doc.data().uid,
                            displayName: doc.data().displayName,
                            name: doc.data().name,
                            surname: doc.data().surname,
                            description: doc.data().description,
                            photoURL: doc.data().photoURL,
                            email: doc.data().email,
                            isAdmin: doc.data().isAdmin,
                            isBanned: doc.data().isBanned,
                            interests: doc.data().interests,
                            createdEvents: doc.data().createdEvents,
                        };
                        setUser(userData);
                    }
                    else{ //else set it to null(for rendering and display logic purpose)
                        setUser(null);
                    }
                })*/ 
        const authUnsubscribe = auth.onAuthStateChanged((user)=>{
            if(user){ //if the user already exist, put their data here
               setUser(user)
            }
            else{ //else set it to null(for rendering and display logic purpose)
                setUser(null);
            }
        })
        return ()=>authUnsubscribe(); //unsubscribe when component unmount
    },[userRef])
    /* F0Nt is fixing
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
                        isBanned: false,
                        interests: [],
                        createdEvents: [],
                        dateJoined: new Date().valueOf(),
                    })//FIXME: Use firestore date
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
    }*/
    
    return ( 
        <div className='hero-container'>
            <h1>Lorem</h1>
            <p>Lorem</p>
            <div className='hero-btns'>
                <button onClick={login} type="button" className="btn btn-outline-light mb-3 btn-lg mx-3">Login with Google</button>
                <button onClick={logout} type="button" className="btn btn-outline-light mb-3 btn-lg mx-3">Logout</button>
            </div>
        </div>
     );
}
 
export default LoginPage;