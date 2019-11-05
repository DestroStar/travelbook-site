import React,{useState} from 'react';
import {Route,} from 'react-router-dom';
import './App.css';
import SideBar from "./sidebar.js";
import Head from "./header.js";
import Map from "./Map.js";
import Notes from "./Notes.js";
import Note from './notesComponents/Note.js'
import Plans from "./Plans.js";
import Gallery from "./Gallery.js";
import Icons from './Icons';
import NewNote from './notesComponents/newNoteComponents/NewNote.js';



function Main(props){
   const [state,setState] = useState({ });
    function regionClicker(ev,worldSeries) {
      console.log(ev.target.dataItem.dataContext);
         setState({
        nameCountry : ev.target.dataItem.dataContext.name,
        idCountry: ev.target.dataItem.dataContext.id,
        map:worldSeries
      })
   }
   function setNoteID(id){
      setState({
         idNote:id
      })
   }

  return (
      <div className = {props.gridClass}>
    <Head/>
    <Map clicker={regionClicker}/>
    <Route path = "/travelbook">
          </Route>
    <Route path = "/generalInfo">
    <Icons countryName={state.nameCountry} id={state.idCountry} worldSeries={state.map}></Icons>
     <SideBar id={state.nameCountry}/>
     </Route>
       <Route path = "/notes">
        <Icons></Icons>
     <Notes name={state.nameCountry} id={state.idCountry} worldSeries = {state.map} setId={setNoteID} />
     </Route>

     <Route path = "/gallery">
        <Icons></Icons>
     <Gallery name={state.nameCountry}/>
     </Route>
     <Route path = "/plans">
        <Icons></Icons>
     <Plans name={state.nameCountry} id={state.idCountry} worldSeries = {state.map}/>
     </Route>
     <Route path = "/note">
        <Icons></Icons>
     <Note countryName={state.nameCountry} id={state.idCountry} worldSeries = {state.map} noteId ={state.idNote} />
     </Route>
     <Route path = "/newnote">
        <Icons></Icons>
     <NewNote countryName={state.nameCountry} id={state.idCountry} worldSeries = {state.map} noteId ={state.idNote} />
     </Route>
     </div>
  );
   }


export default Main;
