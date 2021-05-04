import firestore from '../../database/firebase';
import {useEffect, useState} from 'react';
import {useParams, Link, useHistory, Redirect} from 'react-router-dom';

const ConfirmDeleteUser = () => {
    const usersRef = firestore.collection('users');
    const {userID} = useParams();

    const [target, setTarget] = useState({});
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

    const deleteHandler = (id) =>{
        usersRef.doc(id).delete().then(()=>{
            console.log(`Deletion on user of id:${id} completed`);
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
        return( 
            <div className="container">
                <h1>Delete User with ID: {userID} </h1>
                <h3>Name: {target.displayName} </h3>
                <button className="btn btn-secondary m-2" onClick={()=>deleteHandler(userID)}>
                    Delete
                </button>
                <Link className="btn btn-primary m-2" to="/Admin/manage-user">
                    Cancel
                </Link>
            </div>
        );
    }
    else{
        return <Redirect to="/404"/> 
    }
}
 
export default ConfirmDeleteUser;