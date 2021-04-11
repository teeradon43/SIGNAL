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