import { useEffect, useState } from 'react';
import firestore from '../../database/firebase';

const ManageUser = () => {
    let [users, setUsers] = useState([]);
    const usersRef = firestore.collection('users');
    useEffect(()=>{
        const unsubscribe = usersRef.onSnapshot(snapshot =>{
            let tempUserList = [];
            snapshot.forEach(doc=>{
                if(doc.data()){
                    //TODO: fetch isBanned from DB
                    tempUserList = [...tempUserList,
                    {
                        userID: doc.data().userID,
                        displayName: doc.data().displayName,
                        name: doc.data().name,
                        surname: doc.data().surname,
                        description: doc.data().description,
                        photoURL: doc.data().photoURL,
                        email: doc.data().email,
                        isAdmin: doc.data().isAdmin,
                        isBanned: doc.data().isBanned,
                        interests: doc.data().interests,
                        createdEvents: doc.data().createdEvents,
                    }]
                }
            });
            setUsers(tempUserList.filter(user => user.isAdmin === false));//Don't allow admin to edit other admin data
        });     
        return ()=>unsubscribe();
    },[]);//XXX: DO NOT ADD usersRef to dependency despite the warning! + DO NOT REMOVE dependencies array!

    const deleteHandler = (id) =>{
        usersRef.doc(id).delete().then(()=>{
            console.log(`Deletion on doc of id:${id} completed`)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    //TODO: Code toggle ban logic
    const banHandler = (id, obj)=>{
        usersRef.doc(id).set(obj).then(()=>{
            console.log(`Toggle ban on uid:${id} is completed`)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return ( 
        <div>
            {users.length>0?
            users.map(user => <UserCard key={user.userID} user={user} deleteUser={()=>deleteHandler(user.userID)} toggleBan={(id,obj)=>banHandler(id,obj)}/>):
            <h1>No user in this list!</h1>}
        </div>
     );
}
 
const UserCard = ({user, toggleBan, deleteUser}) =>{

    const banHandler = (userID) =>{
        const obj = {...user, isBanned: !user.isBanned};
        toggleBan(userID, obj);
    }


    return (
        <div className="card m-2">
            <div className="card-header">
                {user.displayName} Information
                <button className="btn btn-warning m-1" style={{'float':'right'}} onClick={() => banHandler(user.userID)}>Toggle Ban</button>
                <button className="btn btn-danger m-1" style={{'float':'right'}} onClick={()=>deleteUser()}>Delete User</button>
            </div>
            <div className="card-body">
                <h5 className="card-title">Email: {user.email}</h5>
                <p className="card-text">isBanned: {user.isBanned.toString()}</p>
            </div>
        </div>
    );
}
export default ManageUser;