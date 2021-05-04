import {useState, useEffect} from 'react';
import { Link, useRouteMatch, Switch, Route} from 'react-router-dom';
import ConfirmDeletePost from './ConfirmDeletePost';

import firestore from '../../database/firebase';

const ManagePost = () =>{
    let { path, url } = useRouteMatch();
    return (
        <Switch>
        <Route exact path={path}>
            <ManagePostInner/>
        </Route>
        <Route path={`${url}/confirm-delete-post/:eventID`}>
            <ConfirmDeletePost/>
        </Route>
    </Switch>
    );
    
}


const ManagePostInner = () => {
    let [posts, setPosts] = useState([]);
    let [reportedNumber, setReportedNumber] = useState(1);
    const postsRef = firestore.collection('events');

    useEffect(()=>{
        const unsubscribe = postsRef.where("noReported",">=",reportedNumber).where("adminDeleted","==",false).orderBy("noReported","asc").onSnapshot(snapshot => {
            let tempPostList = [];
            snapshot.forEach((doc)=>{
                if(doc.data()){
                    if(doc.data().adminDeleted === false){
                        tempPostList = [...tempPostList,
                            {
                                eventID: doc.id,
                                hostUserID: doc.data().uid,
                                eventName: doc.data().title,
                                description: doc.data().description,
                                attendeeNumber: doc.data().noAttendee,
                                maxAttendee: doc.data().maxAttendee,
                                cost: doc.data().cost,
                                image: doc.data().img,
                                dateCreated: doc.data().dateCreated,
                                eventDate: doc.data().date,
                                timeReported: doc.data().noReported,
                                adminDeleted: doc.data().adminDeleted
                            }];
                    }
                    
                }
            });
            setPosts(tempPostList);//Show only non deleted data
        });

        return () => unsubscribe();
    }, [reportedNumber])//XXX: DO NOT ADD postsRef to dependency despite the warning! + DO NOT REMOVE dependencies array!



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
                    <label htmlFor="timesReported">Minimum times reported: </label>
                    <input type="number" className="form-control" id="timesReported" placeholder="0" onChange={reportedNumberHandler} value={reportedNumber}/>
                </div>
            </form>
            
            {posts.length >0?
            posts.map(post => <PostCard post={post} key={post.eventID} />):
            <div className="d-flex flex-row justify-content-center">
                <h1>
                    No post in this list!
                </h1>
            </div>
            }
        </div>
     );
}

const PostCard = ({post}) =>{
    let { url } = useRouteMatch();
    return (
        <div className="card m-2">
            <div className="card-header">
                <Link to={`/events/${post.eventID}`}>
                    {post.eventName} Information
                </Link>
                <Link className="btn btn-danger m-1" style={{'float':'right'}} to={`${url}/confirm-delete-post/${post.eventID}`}>
                    Delete Post
                </Link>
            </div>
            <div className="card-body">
                <h5 className="card-text">Event ID: {post.eventID}</h5>
                <p className="card-text">Times Reported: {post.timeReported}</p>
            </div>
        </div>
    );
}


 
export default ManagePost;