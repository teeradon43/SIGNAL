import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import "../../App.css";
import "../../Webflow.scss";
import "../../Tags.scss";
import { ReactComponent as LogoC } from "../../images/calendar.svg";
import { ReactComponent as LogoP } from '../../images/pictures.svg';
import { CreateEvent, validateFileExtension } from "../models/events";
import { auth } from "../../database/firebase";
import validate from "../formValidate";
import useForm from "../useForm";
import { red } from "@material-ui/core/colors";

import '../../Tags.scss';

const Button = styled.button`
  background-color: #0077ff;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  font-size: 22px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #3f51b5;
  }
`;

const Cancel = styled.button`
  background-color: #ff3535;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  font-size: 22px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  transition: ease background-color 250ms;

  &:hover {
    background-color: #c02020;
  }
`;

const CreatePost = ({submitForm}) => {
  const history = useHistory();
  const { handleChange, handleSubmit, input, errors } = useForm(
    submitForm,
    validate
  ); 

  const [tags, setTags] = useState(["Event"]);
  const [img, setImg] = useState(null);

  useEffect(()=>{//first time only: set minimum date to today
    //XXX: https://stackoverflow.com/questions/50718968/how-do-i-disable-dates-till-current-date-for-input-type-datetime-local/50719733
    let elem = document.getElementById("eventDate")
    let iso = new Date().toISOString();
    let minDate = iso.substring(0,iso.length-1);
    elem.value = minDate
    elem.min = minDate
  },[]);

  useEffect(()=>{//Everytime tags change
    //console.log(tags)
    handleChange({
      target:{
        value: tags,
        name: "tags"
      }
    })
  },[tags]);
  useEffect(()=>{//Everytime image change
    //console.log("new image");
    handleChange({
      target:{
        value: img,
        name: "img"
      }
    })
  },[img]);


  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      const file =  event.target.files[0];
      if(validateFileExtension(file.name)){
        setImg(file);
        //console.log(file);
      }        
    }
  }

  function handleClick() {
    history.push("/");
  }


  return (
    <div className="App-skeleton-ground">
      <div style={{ marginLeft: "auto", marginRight: "auto", width: "60vw" }}>
        <h1 style={{ color: "white", fontFamily: "PT Sans", fontSize: "50px" }}>
          {" "}
          Create Event{" "}
        </h1>
      </div>
      <div className="App-skeleton-bg" onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ width: "30vw" }}>
            <form style={{ marginBottom: "30px" }} onSubmit={handleSubmit}>
              <h3> Event Title </h3>
              <div className="webflow-style-input">
                <input
                  name="title"
                  type="text"
                  placeholder="Board Game Food Party"
                  maxLength="100"
                  minLength="5"
                  onChange={handleChange}
                  value={input.title}
                  required
                ></input>
                {errors.title && <p style={{ marginTop: "10px", color: "#ff9797"}}>{errors.title}</p>}
              </div>
              <h3 style={{ marginTop: "25px" }}> Event Description </h3>
              <textarea
                style={{ whiteSpace: "pre-wrap" }}
                name="description"
                className="App-skeleton-textareadesc"
                placeholder="Rule: No anime."
                onChange={handleChange}
                value={input.description}
              />
              {errors.description && <p style={{ marginTop: "10px", color: "#ff9797"}}>{errors.description}</p>}
            </form>
            <TagsJSX tags={tags} setTags={setTags}/>
          </div>
          <div style={{ width: "15vw" }}>
            <div style={{ display: "flex" }}>
              <Thumbnail onImageChange={onImageChange} img={img}/>
            </div>
            <div style={{ display: "flex" }}>
              <label htmlFor="date" className="mr-2">Event Date</label>
              <input type="hidden" id="timezone" name="timezone" value="+07:00"/>{/*Can be use to tell timezone (must be added manually)*/}
              <input name="date" id="eventDate" type="datetime-local" className="form-control" onChange={handleChange} required/> {/*XXX: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local */}
            </div>
            <h4 style={{ marginTop: "30px" }}> Max Attendee </h4>
            <div className="webflow-style-input1">
              <input
                name="maxAttendee"
                type="number"
                pattern="[1-9]|[1-9][0-9]"
                placeholder="5"
                maxLength="2"
                onChange={handleChange}
                value={input.maxAttendee}
                required
              ></input>
              {errors.maxAttendee && <p style={{ marginTop: "10px", color: "#ff9797"}}>{errors.maxAttendee}</p>}
            </div>
            <h4 style={{ marginTop: "40px" }}> Cost </h4>
            <div className="webflow-style-input1">
              <input
                name="cost"
                type="number"
                pattern="[1-9]|[1-9]([0-9]{1-3})"
                placeholder="690"
                maxLength="4"
                onChange={handleChange}
                value={input.cost}
                required
              ></input>
              {errors.cost && <p style={{ marginTop: "10px", color: "#ff9797"}}>{errors.cost}</p>}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "30px",
          width: "80vw",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Cancel onClick={handleClick}> Cancel </Cancel>
        <Button onClick={handleSubmit} style={{ marginLeft: "20px" }}>
          {" "}
          Create{" "}
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;

const TagsJSX= ({tags, setTags}) => {
  const removeTags = indexToRemove => {
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
  }

	return (
		<div className="App">
			<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => (event.key === "Enter" && tags.length < 6) ? checkSameTags(event) : null}
				placeholder="Press enter to add tags"
			/>
		</div>
		</div>
	);   
}

const Thumbnail = ({onImageChange, img}) =>{
  return (
    <div>
        <div>
            <div>
                <label htmlFor='myPicture' style={{ display: 'flex' }}>
                    <LogoP style={{cursor: 'pointer', width: '30px', height: '30px'}} />
                    <h4 style={{ marginLeft: '1vw' }}> Thumbnail </h4>
                </label>
                <input id='myPicture' name='img' type="file" style={{display: 'none'}} onChange={onImageChange}/>
            </div>
            {img ? <img src={URL.createObjectURL(img)} style={{width: '10vw', cursor: 'default', borderRadius: '4px', marginTop: '10px', marginBottom: '20px'}} alt="event image"/>:null}
        </div>
    </div>
  );
}
