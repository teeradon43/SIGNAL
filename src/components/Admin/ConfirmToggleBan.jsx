import firestore from '../../database/firebase';

import {useParams, Link, useHistory, Redirect} from 'react-router-dom';
import { useEffect, useState } from 'react';

const ConfirmToggleBan = () => {
    const usersRef = firestore.collection('users');
    const {userID} = useParams();

    const [target, setTarget] = useState({});
    const [banStatus, setBanStatus] = useState(false);
    const [fetchState, setFetchState] = useState("fetching");
    const history = useHistory();
    useEffect(()=>{
        usersRef.doc(userID).get().then(doc=>{
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

    const editHandler = (userID)=>{
        usersRef.doc(userID).update({
            isBanned: !target.isBanned
        }).then(()=>{
            console.log(`Toggle ban on uid:${userID} is completed`);
            history.push('/Admin/manage-user');
        })
        .catch((err)=>{
            console.log(err);
        })
    }

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
                <h1>Toggle Ban for User with ID: {userID}?</h1>
                <h3>Name: {target.displayName} </h3>
                <h3>Current ban status: { target.isBanned ? "❌ Banned!" : "✔️ Not Banned!" } </h3>
                <button className="btn btn-secondary m-2" onClick={()=>editHandler(userID)}>
                    Toggle
                </button>
                <Link className="btn btn-primary m-2" to="/Admin/manage-user">
                    Cancel
                </Link>
            </div>
        );
    }else{
        return <Redirect to="/404"/> 
    }
}
 
export default ConfirmToggleBan;