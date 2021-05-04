import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import {useHistory} from 'react-router-dom'

import firestore, {auth} from '../../database/firebase'
//import firebase from 'firebase';
//TODO: Make Review Events Too!

const ReviewPage = () => {
    //const firestore = firebase.firestore();
    const history = useHistory();

    const [rating, setRating] = useState(1);
    const [description, setDescription] = useState("");
    const [state, setState]= useState("fetch");
    const {userID} = useParams();
    const revieweeRef = firestore.collection("users").doc(userID);
    const [targetName, setTargetName] = useState("NONAME");

    useEffect(()=>{
        const authUnsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const {currentUser} = auth;

                const ref = firestore.collection('users').doc(currentUser.uid)
                ref.get().then((userData)=>{
                   if(userData.data().isBanned){//banned user can't review others
                        history.push("/login");
                        return;
                   } 
                });

                if(currentUser.uid === userID){//can't review yourself
                    setState("same");
                    return;
                }

                revieweeRef.get().then((doc)=>{//target must exists
                    if(doc.exists){
                        setTargetName(doc.data().displayName);
                        setState("ok");
                        return;
                    }
                    setState("fail");
                })
                .catch(err=>console.log(err));
            }
            else{//if not login, redirect to login page
                history.push("/login");
            }
          }); 

          return () => authUnsubscribe();
    },[])
       
    

    const submitHandler = (e) =>{
        e.preventDefault();
        alert(`Rating: ${rating}\nDescription:${description}`);
        const {currentUser} = auth;//NOTE: you can get currently logged in user from auth object, too!
        revieweeRef.collection("reviews").add({
            userID: currentUser.uid,
            rating: rating,
            description:description,
            dateRated: new Date(),
            timeReported:0
        }).then(()=>{
            history.push("/");//TODO: go somewhere else
        })
        .catch(err=>{
            console.log("Add review failed: "+err);
        })   
    }
    const goBackHandler = () =>{
        history.push(`/u/${userID}`);
    }
    
    if(state==="same"){
        return(
            <Redirect to="/404"/>
        );
    }
    else if(state==="fetch"){
        return(
            <div className="container">
                Fetching User
            </div>
        );
    }
    else{
        return ( 
            <div className="container">
                {state==="fail" ? 
                <div>
                    No user found!
                </div>
                :
                <>
                    <h2>You're reviewing {targetName}</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="rating" className="mb-2">Rating</label>
                            <select defaultValue={1} name="rating" id="rating" className="form-control" onChange={e => setRating(parseInt(e.target.value))}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="mb-2">Review Description</label>
                            <textarea className="form-control" id="description" name="description" rows="3" placeholder="How do you feel?" onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-success m-2 p-1" onClick={submitHandler}>Submit Review</button>
                        <button type="submit" className="btn btn-secondary m-2 p-1" onClick={goBackHandler}>Cancel</button>
                    </form>
                </>
                }
                
            </div>
         );
    }
    
}
 
export default ReviewPage;