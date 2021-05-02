import { useState, useEffect } from 'react';
import { auth } from "../database/firebase";
import { CreateEvent, validateFileExtension, UpdateEvent } from "./models/events";
import { Link, useHistory, useParams } from "react-router-dom";
import firestore from "../database/firebase"


const useForm = (callback, validate) => {
    const history = useHistory();
    const [input, setInput] = useState({
      uid: auth.currentUser ? auth.currentUser.uid : null,
      title: "",
      description: "",
      date: "",
      maxAttendee: 0,
      cost: 0,
      img: [],
      tags: [],
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            setInput({ ...input, uid: user.uid });
          }
        });
      }, []);
    const handleChange = (e) => {
        const { target } = e;
        const { name } = target;
        const value = target.value;
        setInput({ ...input, [name]: value });
    };
    
    const [img, setImg] = useState(null);
    
    const onImageChange = event => {
      const { target } = event;
      const { name } = target;
      const value = target.value;
      if (event.target.files && event.target.files[0]) {
        const file =  event.target.files[0];
        if(validateFileExtension(file.name)){
          setImg(file);
          console.log(file);
        }        
      }
      setInput({ ...input, [name]: value });
    }

    const handleSubmit = (e) => {
        //e.preventDefault();
        //setErrors(validate(input));
        setIsSubmitting(true);
        console.log("submit value", setErrors(validate(input)));
        if(errors.pass == 4){
          console.log("img", input.img)
          const docId = CreateEvent(input);
          console.log("docId:", docId); // stills error
          history.push("/");
        }
    };

    /*useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );*/

  return { handleChange, onImageChange, handleSubmit, input, errors };
};

export default useForm;