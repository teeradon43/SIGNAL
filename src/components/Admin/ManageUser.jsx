import { useEffect, useState } from 'react';
import {useRouteMatch, Link, Switch,Route} from 'react-router-dom';
import ConfirmDeleteUser from './ConfirmDeleteUser';
import ConfirmToggleBan from './ConfirmToggleBan';
import firestore from '../../database/firebase';

const ManageUser = () =>{
    let { path, url } = useRouteMatch();
    return (
    <Switch>
        <Route exact path={path}>
            <ManageUserInner/>
        </Route>
        <Route path={`${url}/confirm-delete-user/:userID`}>
            <ConfirmDeleteUser/>
        </Route>
        <Route path={`${url}/confirm-toggle-ban/:userID`}>
            <ConfirmToggleBan/>
        </Route>
    </Switch>
    );
}


const ManageUserInner = () => {
    const [fetchState, setFetchState] = useState("fetching");
    let [users, setUsers] = useState([]);
    const usersRef = firestore.collection('users');
    useEffect(()=>{
        //TODO: Query isAdmin instead of using .filter()
        const unsubscribe = usersRef.onSnapshot(snapshot =>{
            let tempUserList = [];
            snapshot.forEach(doc=>{
                if(doc.data()){
                    tempUserList = [...tempUserList,
                    {
                        userID: doc.data().uid,
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
            setFetchState("done");
        });     
        return ()=>unsubscribe();
    },[]);//XXX: DO NOT ADD usersRef to dependency despite the warning! + DO NOT REMOVE dependencies array!

    if(fetchState==="done"){
        return ( 
            <div>
                {users.length>0 ?
                    users.map(user => <UserCard key={user.userID} user={user} />):
                    <div className="d-flex flex-row justify-content-center">
                        <h1>
                            No user in this list!
                        </h1>
                    </div>
                }
            </div>
         );
    }
    else{
        return (
            <div className="d-flex flex-row justify-content-center">
                <h1>
                    Fetching...
                </h1>
            </div>
        );
    }
    
}
 
const UserCard = ({user}) =>{
    let { url } = useRouteMatch();
    return (
        <div className="card m-2">
            <div className="card-header">
                <Link to={`/u/${user.userID}`}>{user.displayName} Information</Link>
                <Link className="btn btn-warning m-1" style={{'float':'right'}} to={`${url}/confirm-toggle-ban/${user.userID}`}>Toggle Ban</Link>
                <Link className="btn btn-danger m-1" style={{'float':'right'}} to={`${url}/confirm-delete-user/${user.userID}`}>Delete User</Link>
            </div>
            <div className="card-body">
                <h5 className="card-title">Email: {user.email}</h5>
                <p className="card-text">Status: { user.isBanned ? "❌ Banned!" : "✔️ OK!" }</p>
            </div>
        </div>
    );
}
export default ManageUser;