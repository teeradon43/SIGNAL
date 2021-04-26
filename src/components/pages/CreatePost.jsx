import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import "../../App.css"
import "../../Webflow.scss"
import "../../Tags.scss"
import { ReactComponent as LogoA } from "../../images/user.svg"
import { ReactComponent as LogoM } from "../../images/salary.svg"
import { ReactComponent as LogoC } from "../../images/calendar.svg"
import Thumbnail from "../../Thumbnail"
import TagsJSX from "../../Tags"
import { CreateEvent } from "../models/events"
import { auth } from "../../database/firebase"

const Button = styled.button`
    background-color: #0077ff;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    text-transform: uppercase;
    font-size: 22px;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    transition: ease background-color 250ms;
    &:hover {
        background-color: #3f51b5;
    }
`

const Cancel = styled.button`
    background-color: #ff3535;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    text-transform: uppercase;
    font-size: 22px;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    transition: ease background-color 250ms;
    
    &:hover {
        background-color: #c02020;
    }
`

const CreatePost = () => {
  const history = useHistory();
  //TODO: Add date img tags into input state
  const [input, setInput] = useState({
    uid: auth.currentUser ? auth.currentUser.uid : null,
    title: "",
    description: "",
    date: "",
    maxAttendee: 0,
    cost: 0,
    img: "",
    tags: [],
  })

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setInput({
          ...input,
          uid: user.uid,
        })
      }
    })
  }, [])

  const handleChange = (e) => {
    const { target } = e
    const { name } = target
    const value = target.value

    setInput({
      ...input,
      [name]: value,
    })
  }

  function handleClick() {
    history.push("/")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("submit value", input)
    CreateEvent(input)
    history.push("/")
  }

  return (
    <div className="App-skeleton-ground">
      <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '60vw' }}>
        <h1 style={{ color: 'white', fontFamily: 'PT Sans', fontSize: '50px' }}> Create Event </h1>
      </div>
      <div className='App-skeleton-bg'>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '30vw' }}>
            <form style={{marginBottom: '30px'}} onSubmit={handleSubmit}>
              <h3> Event Title </h3>
              <div className="webflow-style-input">
                <input name="title" type="text" placeholder='Board Game Food Party' maxLength='100' minLength='5' onChange={handleChange} required></input>
              </div>
              <h3 style={{ marginTop: '25px' }}> Event Description </h3>
              <textarea style={{whiteSpace: 'pre-wrap'}} name="description" className='App-skeleton-textareadesc' placeholder='Rule: No anime.' onChange={handleChange} />
            </form>
            <TagsJSX/>
          </div>
          <div style={{ width: '15vw' }}>
            <div style={{ display: 'flex' }}>
              <Thumbnail />
            </div>
            <div style={{ display: 'flex' }}>
              <LogoC style={{ width: '30px' }}/>
              <div className="webflow-style-input1" style={{ marginLeft: '1vw' }}> <input name='date' type="date" required></input> </div>
            </div>
            <h4 style={{ marginTop: '30px' }}> Max Attendee </h4>
            <div className="webflow-style-input1">
              <input name="maxAttendee" type='text' pattern='[1-9]|[1-9][0-9]' placeholder='5' maxLength='2' onChange={handleChange} required></input>
            </div>
            <h4 style={{ marginTop: '20px' }}> Cost </h4>
            <div className="webflow-style-input1">
              <input name="cost" type='text' pattern='[1-9]|[1-9]([0-9]{1-3})' placeholder='690' maxLength='4' onChange={handleChange} required></input>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '30px', width: '80vw', display: 'flex', justifyContent: 'flex-end' }}>
        <Cancel onClick={handleClick}> Cancel </Cancel>
        <Button onClick={handleSubmit} style={{ marginLeft: '20px' }}> Create </Button>
      </div>
    </div>
  )
}

export default CreatePost
