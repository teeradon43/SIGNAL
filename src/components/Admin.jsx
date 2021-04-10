import {Link, useRouteMatch, Switch, Route} from 'react-router-dom';

const Admin = () => {
    let { path, url } = useRouteMatch();
    console.log(url, path)
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
                    <h3>Please select what to manage.</h3>
                </Route>
                <Route path={`${url}/manage-user`}>
                    Manage user
                </Route>
                <Route path={`${url}/manage-post`}>
                    Manage post
                </Route>
            </Switch>
        </>
     );
}
 
export default Admin;