import firestore, { auth } from "../../database/firebase";
import React, { useState, useEffect } from 'react'
import { useHistory,} from "react-router-dom"
import '../../App.css'
import "./css/UserDetails.css";
import "./css/EditUser.css";
import validate from "../userValidate";
const EditUser=(/*{submitForm}*/)=>{
  const [users, setUsers] = useState({});
  const history = useHistory();
  /*const { handleChange, handleSubmit, input, errors } = useForm(
    submitForm,
    validate,
  ); */

  const [tags, setTags] = useState(null);
  const [img, setImg] = useState(null);

  function handleCancel() {
    history.push(`/u/${users.uid}`);
  }
  async function fetchUser() {
    const userId = auth.currentUser.uid;
    const res = await firestore
      .collection("users")
      .doc(userId)
      .get()
      .then((snapshot) => {
        setUsers(snapshot.data());
      })
      .catch((err) => {
        alert("ERROR: ", err.message);
      });
  }

  useEffect(() => {
    fetchUser();
    setImg(users.img);
  }, []);
  useEffect(()=>{
    setTags(users.interests)
  },[users.interests])
  /*useEffect(()=>{//Everytime tags change
    //console.log(tags)
    handleChange({
      target:{
        value: users.tags,
        name: "tags"
      }
    })
  },[users.tags]);*/

  /*useEffect(()=>{//Everytime image change
    //console.log("new image");
    handleChange({
      target:{
        value: users.img,
        name: "img"
      }
    })
  },[users.img]);*/

  /*const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      const file =  event.target.files[0];
      if(validateFileExtension(file.name)){
        setImg(file);
        //console.log(file);
      }        
    }
  }*/
  return(
    <div className="App-skeleton-ground">
      <div style={{ marginLeft: "auto", marginRight: "auto", width: "60vw" }}>
        <h1 style={{ color: "white", fontFamily: "PT Sans", fontSize: "50px" }}>
          {" "}
          Edit User{" "}
        </h1>
      </div>
      <div className="App-skeleton-bg">
        <form>
          <div className="row">
            <div className="col-3">
              Name:
            </div>
            <div className="col-6">
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Enter display name"
                class="form-control"
                maxLength="100"
                //onChange={handleChange}
                defaultValue={users.displayName}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              Profile Picture:
            </div>
            <div className="col-6" style={{ marginTop: "10px"}}>
            <img
                src={users.img}
                alt={users.img}
                height="100px"
                width="100px"
            />
            <br></br>
            <button className="btn btn-outline-light" style={{ marginTop: "10px"}} onClick={handleCancel}>change picture</button>
            <br></br>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              Faculty:
            </div>
            <div className="col-6" style={{ marginTop: "10px"}}>
              <div className="form-group">
                <select defaultValue={users.faculty} name="Faculty" id="Faculty" className="form-control">
                  <option value={""}></option>
                  <option value={"Engineering"}>Engineering</option>
                  <option value={"Art"}>Art</option>
                  <option value={"Law"}>Law</option>
                  <option value={"Agriculture"}>Agriculture</option>
                  <option value={"Architecture"}>Architecture</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: "10px"}}>
            <div className="col-3">
              Interest(s):
            </div>
            <div className="col-6">
              <input
                type="text"
                class="form-control"
                placeholder="Press enter to add tags"
              />
              <TagsJSX tags={tags}/>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-warning">+</button>
            </div>
          </div>
          <button className="btn btn-outline-success" onClick={handleCancel} style={{ marginTop: "10px"}}>Save</button>
          <button className="btn btn-outline-danger" onClick={handleCancel} style={{ marginTop: "10px"}}>Cancel</button>
        </form>
      </div>  
      <br/>
    </div>
  );
};
export default EditUser;
const TagsJSX= ({tags}) => {
  /*const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};

	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};

  const checkSameTags = event => {
      for (var i = 0; i < tags.length; i++) {
          if (event.target.value === tags[i]) {
              return(null);
          }
      }
      addTags(event);
  }*/
  if (tags==null){
    return (<h>fetching</h>)
  }
	return (
		<div className="App">
			<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'>
							x
						</span>
					</li>
				))}
			</ul>
		  </div>
		</div>
	);   
}