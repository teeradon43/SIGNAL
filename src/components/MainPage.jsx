import React from 'react';
import firestore, {auth, googleProvider} from '../database/firebase';
import ReactDOM from 'react-dom'

const MainPage = () => {
    /*const signOutHandler = () =>{
        auth.signOut().then(()=>{
            console.log("Logout OK")
        })
        .catch((err)=>{
            console.log("Logout Error: "+err);
        })
    }*/
    const createEventHandler = () =>{
        //Redirect to createEvent
    }
    //TODO:fetch data from firebase and tranform eventID to eventDetail
    //where should detail fetch
    class Event extends React.Component{
        constructor(props) {
            super(props);
            this.state = {ID: this.props.ID};
        }
        render(){
            return(
                <div className="jumbotron">
                    {this.state.ID}
                </div>
            );
        }
    }
    class EventsListDisplay extends React.Component{
        constructor(props) {
            super(props);
            this.state = {EventID : [1,2,3]}//should fetch id before
        }
        render(){
            return (
                <div>
                    {this.state.EventID.map(item=>(
                        <Event ID = {item}/>
                    ))}
                </div>
            );
        }
    }
    return (  
        <div class="container-fluid">
            <div>
            <button onClick={createEventHandler}>Create Event</button>
            </div>
            <div>
                <EventsListDisplay/>
            </div>
        </div>
    );
}
 
export default MainPage;