import {useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import firestore,{auth} from '../database/firebase';

const Navbar = () => {
  let [user,setUser] = useState(null);
  const userRef = useRef(firestore.collection("users")).current;
  //FIXME: Logout don't display on the UI correctly
  useEffect(()=>{ //fetch user data from firestore
      const authUnsubscribe = auth.onAuthStateChanged((firebaseUser)=>{
          if(firebaseUser){ //if the user already exist, put their data here
              userRef.doc(firebaseUser.uid).onSnapshot((doc)=>{
                  if(doc.data()){ //if the user already exist, put their data here
                      const userData={
                          userID: doc.data().uid,
                          displayName: doc.data().displayName,
                          name: doc.data().name,
                          surname: doc.data().surname,
                          description: doc.data().description,
                          photoURL: doc.data().photoURL,
                          email: doc.data().email,
                          isAdmin: doc.data().isAdmin,
                          interests: doc.data().interests,
                          createdEvents: doc.data().createdEvents,
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

    const logoutHandler = () =>{
      auth.signOut().then(()=>{
        console.log("Logout OK");
        setUser(null);//TODO: is this redundant?
      })
      .catch((err)=>{
        console.log("Logout Error: "+err);
      })
    }

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          SIGNAL
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Main
              </Link>
            </li>
            <li className="navbar-item">
              {user ? (<Link to="/login" className="nav-link">
                Login
              </Link>): (<Link className="nav-link" to="login" onClick={logoutHandler}>Logout</Link>)}
              
            </li>
          </ul>
        </div>
      </nav>
    );
}

export default Navbar;