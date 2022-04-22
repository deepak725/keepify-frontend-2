import React, { useEffect, useState } from "react";
import Note from "../Note/Note";
import { IoIosAdd } from "react-icons/io";
import './Notes.css'
import {VscSymbolColor} from "react-icons/vsc";
// import Tags from "../Tags/Tags";
function Notes ({ onAdd }) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  // const [user,setUser] = useState({
  //   name:"deepak",
  //   email:"mscit@gmail.com"  
  // });
  const [tag,setTag] = useState([
      "work","study"
  ]);
  const [color,setBgcolor] = useState("#ffc812");
  const [notes, setNotes] = useState([]);
  const [notes2, setNotes2] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    apiGet();
 },[]); 



  function handleChange(e) {
    const { name, value } = e.target;
    
    setNote((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  function handleExpanded() {
    setExpanded(true);
  }

  const postData = async(e) =>{
      e.preventDefault();
      console.log(note.title)
      console.log(note.content)
      console.log(color)
      console.log(tag)
      const res = await fetch("https://keepify-keepify-backend.herokuapp.com/notes",{
        method:"POST",
        headers:{
          'x-access-token': localStorage.getItem('token'),
          title:note.title,
          content:note.content,
          tag:tag,
          color:color
        },
       
      })
      const res2 = await res.json();
      console.log(res2);
      submitButton();
  }
  function submitButton(event) {
    //  fetch("https://retoolapi.dev/UPF9Vy/data")
    // .then((res) => res.json())
    // .then((data) => {
    //  // console.log(data);
    //   setNotes(data);
    // //  console.log(notes);
      
    // });
   
    setNote({
      title: "",
      content: "",
    });
    setBgcolor("white");
    setTag([]);
    setExpanded(false);
    // console.log(notes);
   
    apiGet();
  }
  const apiGet = async () => {
    const req = await fetch('https://keepify-keepify-backend.herokuapp.com/notes', {
      method:"GET",
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
    })

    const data = await req.json()
		console.log(data);
    console.log(data.data[0].note);
    setNotes(data.data);
      // .then((json) => {
      //   // console.log(json);
      //   // setNotes(json);
      // });


    
  };

  const apiGet2 = async (search2) => {
    
     
    setNotes2([]);
    console.log(search2);
    const req = await fetch('https://keepify-keepify-backend.herokuapp.com/search', {
      method:"GET",
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'search':search2
        },
    })

    const data = await req.json()
		console.log(data);
    setNotes2(data.data);
    console.log(search2);
    setSearch(" ");
    

 
    
  };
  return (
    <div className="Notes">
      <form onSubmit={(e)=>{e.preventDefault();apiGet2(search)}}>
      <input
            
            type="text"
            placeholder="Search"
            name="title"
             onChange={(e)=>{setSearch(e.target.value)}}
          //  onFocus={(e)=>{console.log(e.target.value)}}  
           required
          />
           <button type={"submit"}>
          <IoIosAdd size={35} />
        </button>
      </form>
      <div className="notes-item">
        {notes2.map(( note, index,_id) => (
        <Note
          key={index}
          title={note.note.title}
          content={note.note.content}
           id={note._id}
          func = {apiGet}
          color ={note.note.color}
        />
      ))}
      </div>
      <form>
      
        {isExpanded && (
          <input
            value={note.title}
            type="text"
            placeholder="Title"
            name="title"
            id="title"
            onChange={handleChange}
          />
        )}
        <p>
          <textarea
            value={note.content}
            onClick={handleExpanded}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
          ></textarea>
         {isExpanded && ( <input type={"color"} style={{width:"10%"}} defaultValue={color} onChange={(e)=>{

              console.log(e.target.value);
              setBgcolor(e.target.value);
         }} />)}
         {/* <Tags /> */}
        </p>
        <button onClick={postData}>
          <IoIosAdd size={35} />
        </button>
       
      </form>
      <div className="notes-item">
        {notes.map(( note, index,_id) => (
        <Note
          key={index}
          title={note.note.title}
          content={note.note.content}
           id={note._id}
          func = {apiGet}
          color ={note.note.color}
        />
      ))}
      </div>
    </div>
  );
}

export default Notes;