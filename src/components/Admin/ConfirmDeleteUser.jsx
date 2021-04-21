import firestore from '../../database/firebase';

import {useParams, Link} from 'react-router-dom';

const ConfirmDeleteUser = () => {
    const usersRef = firestore.collection('users');
    const {userID} = useParams();
    const deleteHandler = (id) =>{
        usersRef.doc(id).delete().then(()=>{
            console.log(`Deletion on user of id:${id} completed`);
            window.location.href='/Admin/manage-user';
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return( 
        <div className="container">
            <h1>Delete User with ID: {userID} </h1>
            <button className="btn btn-secondary m-2" onClick={()=>deleteHandler(userID)}>
                Delete
            </button>
            <Link className="btn btn-primary m-2" to="/Admin/manage-user">
                Cancel
            </Link>
        </div>
        );
}
 
export default ConfirmDeleteUser;