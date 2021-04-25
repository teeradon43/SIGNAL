import { useEffect, useState } from "react";
import { useParams } from "react-router";

import firestore from '../../database/firebase'

//TODO: Make Review Events Too!

const ReviewPage = () => {
    const [rating, setRating] = useState(1);
    const [description, setDescription] = useState("");
     
    const [state, setState]= useState("fetch");

    const {userID} = useParams();

    const userRef = firestore.collection("users").doc(userID);

    useEffect(()=>{
        userRef.get().then((doc)=>{
            if(doc.data()){
                setState("ok");
                return;
            }
            setState("fail");
        })
        .catch(err=>console.log(err));
    });

    const submitHandler = (e) =>{
        e.preventDefault();
        alert(`Rating: ${rating}\nDescription:${description}`);//TODO: Post to firebase
        userRef.collection("reviews").add({
            userID: "fetchreviewerIDhere",//TODO: Use real user ID
            rating: rating,
            description:description,
            dateRated: new Date(),
            timeReported:0
        }).then(()=>{
            console.log("Add review success");
        })
        .catch(err=>{
            console.log("Add review failed: "+err);
        })
        
    }
    

    if(state==="fetch"){
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
                <form>
                    <div className="form-group">
                        <label htmlFor="rating" className="mb-2">Rating</label>
                        <select name="rating" id="rating" className="form-control" onChange={e => setRating(parseInt(e.target.value))}>
                            <option value="1" selected="true">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="description" className="mb-2">Review Description</label>
                        <textarea class="form-control" id="description" name="description" rows="3" placeholder="How do you feel?" onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-success m-2 p-1" onClick={submitHandler}>Submit Review</button>
                </form>
                }
                
            </div>
         );
    }
    
}
 
export default ReviewPage;