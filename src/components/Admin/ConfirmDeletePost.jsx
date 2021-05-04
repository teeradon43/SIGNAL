import firestore from '../../database/firebase';
import {useParams, Link, useHistory, Redirect} from 'react-router-dom';
import { useEffect, useState } from 'react';

const ConfirmDeletePost = () => {
    const {eventID} = useParams();
    const postsRef = firestore.collection('events');
    const [target, setTarget] = useState({});
    const [fetchState, setFetchState] = useState("fetching"); 
    const history = useHistory();
    useEffect(()=>{
        postsRef.doc(eventID).get().then(doc=>{
            if(doc.exists){
                setTarget(doc.data());
                setFetchState("done");
            }
            else{
                setFetchState("notfound");
            }

        })
        .catch(err=>{
            console.log(err);
            setFetchState("error");
        })
    })


    const deleteHandler = (id) =>{
        postsRef.doc(id).update({
            adminDeleted: true
        }).then(()=>{
            console.log(`Delete event by admin on id:${id} is completed`);
            history.push('/Admin/manage-post');
        })
        .catch((err)=>{
            console.log(err);
        })
    };

    
    if(fetchState==="fetching"){
        return(
            <div className="d-flex flex-row justify-content-center">
                <h1>
                    Fetching...
                </h1>
            </div>
        );
    }
    else if(fetchState==="done"){
        return ( 
        <div className="container">
            <h1>Delete Post with ID: {eventID}?</h1>
            <h3>Title: {target.title}?</h3>
            <button className="btn btn-secondary m-2" onClick={()=>deleteHandler(eventID)}>
                Delete
            </button>
            <Link className="btn btn-primary m-2" to="/Admin/manage-post">
                Cancel
            </Link>
        </div>);
    }
    else{
        return(
            <Redirect to="/404"/>
        );
    }
}
 
export default ConfirmDeletePost;