import React from 'react';
import firestore, {auth, googleProvider} from '../database/firebase';

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
        //TODO:Redirect to createEvent
    }
    //TODO:fetch data from firebase and tranform eventID to eventDetail
    //where should detail fetch
    class Event extends React.Component{
        constructor(props) {
            super(props);
            this.state = {ID: this.props.ID};
        }
        fetchData(){

        }
        //TODO:add onclick redirect
        render(){
            return(
                <div className="jumbotron">
                    <div className = "row">
                        <div className = "col-2">
                            img here
                        </div>
                        <div className = "col-4">
                            <div>
                                2222
                            </div>
                            <div>
                                name
                            </div>
                            <div>
                                des
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    class EventsListDisplay extends React.Component{
        constructor(props) {
            super(props);
            this.state = {EventID : [1,2,3,4,5]}//should fetch id before
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