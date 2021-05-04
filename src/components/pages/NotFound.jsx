import { Link } from "react-router-dom"

const NotFound = () => {
    return ( 
        <div style={{textAlign:"center", margin:"10px"}}>
            <div>
                <h1>
                    Your requested page is not found!
                </h1>
                <img src="no_signal.jpg" alt="no signal"/>
            </div>
            <br/>
            <div style={{fontSize:"20px"}}>
                <p>
                    This page simply does not exist or you have no permission!
                </p>
                <p>  
                    Go back to <Link to="/main-page">main page</Link> or try <Link to="/login">logging in.</Link>
                </p>
            </div>
        </div>
     );
}
 
export default NotFound;