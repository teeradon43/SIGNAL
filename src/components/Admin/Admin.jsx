import {Link, useRouteMatch, Switch, Route, Redirect, useHistory} from 'react-router-dom';

import ManageUser from './ManageUser';
import ManagePost from './ManagePost';
import firestore, { auth } from '../../database/firebase';
import { useEffect, useState } from 'react';

const Admin = () => {
    let { path, url } = useRouteMatch();
    const history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);
    const [fetchState, setFetchState] = useState("fetching");
    
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                const userID = user.uid
                firestore.collection("users").doc(userID).get().then(doc=>{
                    if(doc.exists){
                        setIsAdmin(doc.data().isAdmin)
                        setFetchState("done");
                    }
                }).catch(err=>console.log("Can't fetch user: ",err));
            }
            else{
                history.push("/404");
            }
        })
    })

    if(fetchState==="done"){
        if(isAdmin){
            return ( 
                <>
                    {/*Management Navbar */}
                    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                        <span className="navbar-brand">
                        Admin Panel
                        </span>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                <Link to={`${url}/manage-user`} className="nav-link">
                                    Manage User
                                </Link>
                                </li>
                                <li className="navbar-item">
                                <Link to={`${url}/manage-post`} className="nav-link">
                                    Manage Post
                                </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
    
                    {/*Manage */}
                    <Switch>
                        <Route exact path={path}>
                        <div className="d-flex flex-row justify-content-center">
                            <h2 className="mt-2">
                                Select topic to manage from the navigator.
                            </h2>
                        </div>
                        </Route>
                        <Route path={`${url}/manage-user`}>
                            <ManageUser/>
                        </Route>
                        <Route path={`${url}/manage-post`}>
                            <ManagePost/>
                        </Route>
                    </Switch>
                </>
            );
        }
        else{
            return <Redirect to="/404"/>
        }
    }
    else{
        return (
            <div className="d-flex flex-row justify-content-center">
                <h1>
                    Fetching...
                </h1>
            </div>
        )
    }
    
}
 
export default Admin;