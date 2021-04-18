import firestore from '../../database/firebase';
import {useParams, Link} from 'react-router-dom';

const ConfirmDeletePost = () => {
    const {eventID} = useParams();
    const postsRef = firestore.collection('events');
    const deleteHandler = (id) =>{
        postsRef.doc(id).update({
            adminDeleted: true
        }).then(()=>{
            console.log(`Delete event by admin on id:${id} is completed`);
            window.location.href='/Admin/manage-post'
        })
        .catch((err)=>{
            console.log(err);
        })
    };
    return ( 
    <div className="container">
        <h1>Delete Post with ID: {eventID}?</h1>
        <button className="btn btn-secondary m-2" onClick={()=>deleteHandler(eventID)}>
            Delete
        </button>
        <Link className="btn btn-primary m-2" to="/Admin/manage-post">
            Cancel
        </Link>
    </div>);
}
 
export default ConfirmDeletePost;