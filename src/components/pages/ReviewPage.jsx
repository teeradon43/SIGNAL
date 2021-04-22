import { useState } from "react";

import firestore from '../../database/firebase'

const ReviewPage = () => {
    const [rating, setRating] = useState(1);
    const [description, setDescription] = useState("");

    //TODO: Choose one for each route (together for temporaly)
    const postsRef = firestore.collection("events");
    const usersRef = firestore.collection("users");

    const submitHandler = (e) =>{
        e.preventDefault();
        alert(`Rating: ${rating}\nDescription:${description}`);//TODO: Post to firebase
    }
    

    return ( 
        <div className="container">
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
        </div>
     );
}
 
export default ReviewPage;