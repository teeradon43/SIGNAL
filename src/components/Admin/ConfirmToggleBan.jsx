import firestore from '../../database/firebase';

import {useParams, Link} from 'react-router-dom';

const ConfirmToggleBan = () => {
    const usersRef = firestore.collection('users');
    const {userID} = useParams();
    const editHandler = (userID)=>{
        usersRef.doc(userID).get().then((doc)=>{
            if(doc.exists){
                const user={
                    userID: doc.data().userID,
                    displayName: doc.data().displayName,
                    isBanned: doc.data().isBanned,
                };
                usersRef.doc(user.userID).update({
                    isBanned: !user.isBanned
                }).then(()=>{
                    console.log(`Toggle ban on uid:${user.userID} is completed`);
                    window.location.href='/Admin/manage-user';
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        }).catch((err)=>console.log("No user: "+err)); 
    }

    return ( 
       <div className="container">
            <h1>Toggle Ban for User with ID: {userID}?</h1>
            <button className="btn btn-secondary m-2" onClick={()=>editHandler(userID)}>
                Toggle
            </button>
            <Link className="btn btn-primary m-2" to="/Admin/manage-user">
                Cancel
            </Link>
        </div>
     );
}
 
export default ConfirmToggleBan;