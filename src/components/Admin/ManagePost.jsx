import {useState, useEffect} from 'react';

import firestore from '../../database/firebase';



const ManagePost = () => {
    let [posts, setPosts] = useState([]);
    const postsRef = firestore.collection('events');

    useEffect(()=>{
        const unsubscribe = postsRef.onSnapshot(snapshot => {
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
    }, [])//XXX: DO NOT ADD postsRef to dependency despite the warning! + DO NOT REMOVE dependencies array!

    //TODO: Add confirmation overlay
    const deleteHandler = (id, obj) =>{
        const newObj = {...obj,adminDeleted: true}
        postsRef.doc(id).set(newObj).then(()=>{
            console.log(`Add delete event by admin on id:${id} is completed`)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return ( 
        <div>
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
                {post.eventName} Information
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