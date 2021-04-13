import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import firestore from '../../database/firebase';



const ManagePost = () => {
    let [posts, setPosts] = useState([]);
    let [reportedNumber, setReportedNumber] = useState(0);
    const postsRef = firestore.collection('events');

    useEffect(()=>{
        const unsubscribe = postsRef.where("timeReported",">=",reportedNumber).onSnapshot(snapshot => {
            let tempPostList = [];
            snapshot.forEach((doc)=>{
                if(doc.data()){
                    if(doc.data().adminDeleted === false){
                        tempPostList = [...tempPostList,
                            {
                                eventID: doc.id,
                                hostUserID: doc.data().hostUserID,
                                eventName: doc.data().eventName,
                                description: doc.data().description,
                                attendeeNumber: doc.data().attendeeNumber,
                                maxAttendee: doc.data().maxAttendee,
                                cost: doc.data().cost,
                                image: doc.data().image,
                                dateCreated: doc.data().dateCreated,
                                eventDate: doc.data().eventDate,
                                aboutTime: doc.data().aboutTime,
                                timeReported: doc.data().timeReported,
                                adminDeleted: doc.data().adminDeleted
                            }];
                    }
                    
                }
            });
            setPosts(tempPostList);//Show only non deleted data
        });

        return () => unsubscribe();
    }, [reportedNumber])//XXX: DO NOT ADD postsRef to dependency despite the warning! + DO NOT REMOVE dependencies array!

    //TODO: Add confirmation overlay
    const deleteHandler = (id, obj) =>{
        const newObj = {...obj,adminDeleted: true}
        postsRef.doc(id).set(newObj).then(()=>{
            console.log(`Add delete event by admin on id:${id} is completed`)
        })
        .catch((err)=>{
            console.log(err);
        })
    };

    const reportedNumberHandler = (e) =>{
        const value = e.target.value;
        if(value < 0){
            setReportedNumber(0);
            return;
        }
        setReportedNumber(parseInt(value));//FIXME: Will this cause high traffic to Firebase server?
    }

    return ( 
        <div>
            <form className="container">
                <div className="form-group">
                    <label for="timesReported">Minimum times reported: </label>
                    <input type="number" class="form-control" id="timesReported" placeholder="0" onChange={reportedNumberHandler} value={reportedNumber}/>
                </div>
            </form>
            
            {posts.length >0?
            posts.map(post => <PostCard post={post} key={post.eventID} deleteHandler={(id, obj)=>deleteHandler(id, obj)}/>):
            <h1>No post in this list!</h1>
            }
        </div>
     );
}

const PostCard = ({post, deleteHandler}) =>{
    return (
        <div className="card m-2">
            <div className="card-header">
                <Link to={`/events/${post.eventID}`}>
                    {post.eventName} Information
                </Link>
                <button className="btn btn-danger m-1" style={{'float':'right'}} onClick={()=>deleteHandler(post.eventID, post)}>Delete Post</button>
            </div>
            <div className="card-body">
                <h5 className="card-title">Host ID: {post.hostUserID}</h5>
                <h5 className="card-text">Event ID: {post.eventID}</h5>
            </div>
        </div>
    );
}


 
export default ManagePost;