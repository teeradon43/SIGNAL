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
    return ( <div>
        <h1>Delete Post?</h1>
        <button className="btn btn-secondary" onClick={()=>deleteHandler(eventID)}>
            Sure!
        </button>
        <Link className="btn btn-primary" to="/Admin/manage-post">
            Cancel
        </Link>
    </div>);
}
 
export default ConfirmDeletePost;