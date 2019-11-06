import { Route} from 'react-router-dom';
import React, {useState,Component} from 'react';
import './App.css';
import SideBar from "./sidebar.js";
import Head from "./header.js";
import Map from "./Map.js";
import Notes from "./Notes.js";
import Plans from "./Plans.js";
import Gallery from "./gallery/Gallery.js";
import Icons from './Icons';
import UserGeneralInformation from "./user-page/UserGeneralInformation";
import Note from './notesComponents/Note.js';
import NewNote from './notesComponents/newNoteComponents/NewNote.js';
import EditNote from './notesComponents/editNoteComponents/EditNote';
import MyPhotos from "./gallery/MyPhotos";
import GeneralPhotos from "./gallery/GeneralPhotos";



class Main extends Component{
   constructor(props){
super(props);
this.state={
   nameCountry : '',
        idCountry: '',
        map:"",
}
this.setNoteID=this.setNoteID.bind(this);
this.regionClicker = this.regionClicker.bind(this);
   }
     regionClicker(ev,worldSeries) {
      console.log(ev.target.dataItem.dataContext);
         this.setState({
        nameCountry : ev.target.dataItem.dataContext.name,
        idCountry: ev.target.dataItem.dataContext.id,
        map:worldSeries,
      })
      localStorage.setItem('country',ev.target.dataItem.dataContext.name);
      localStorage.setItem('id',ev.target.dataItem.dataContext.id)
      localStorage.setItem('world',worldSeries)

   }
    setNoteID(id){
      console.log("got"+id);
      this.setState({
         idNote:id
      })
   }
   componentDidMount(){
      console.log(localStorage.getItem('world'))
    if(this.state.nameCountry===''){
      
       this.setState({nameCountry:localStorage.getItem('country'),
       idCountry: localStorage.getItem('id'),
       map:localStorage.getItem('world')})
    }
    
   }
render(){
  return (
      <div className = {this.props.gridClass}>
    <Head/>
    <Map clicker={this.regionClicker}/>
    <Route path = "/travelbook">
          </Route>
    <Route path = "/generalInfo">
    <Icons countryName={this.state.nameCountry} id={this.state.idCountry} worldSeries={this.state.map}></Icons>
     <SideBar id={this.state.nameCountry}/>
     </Route>
       <Route path = "/notes">
        <Icons></Icons>
     <Notes name={this.state.nameCountry} id={this.state.idCountry} worldSeries = {this.state.map} setId={this.setNoteID} />
     </Route>
          <Route path="/gallery">
              <Icons></Icons>
              <Gallery name={this.state.nameCountry}/>
          </Route>
     <Route path = "/plans">
        <Icons></Icons>
     <Plans name={this.state.nameCountry} id={this.state.idCountry} worldSeries = {this.state.map}/>
     </Route>

          <Route
              path="/my-photos"
              render={props => <MyPhotos {...props}/>}
          />
          <Route
              path="/general-photos"
              render={props => <GeneralPhotos {...props}/>}
          />
     <Route path = "/note">
        <Icons></Icons>
     <Note countryName={this.state.nameCountry} id={this.state.idCountry} worldSeries = {this.state.map} noteId ={this.state.idNote} />
     </Route>
     <Route path = "/newnote">
        <Icons></Icons>
     <NewNote countryName={this.state.nameCountry} id={this.state.idCountry} worldSeries = {this.state.map} noteId ={this.state.idNote} />
     </Route>
     <Route path = "/editNote">
        <Icons></Icons>
     <EditNote countryName={this.state.nameCountry} id={this.state.idCountry} worldSeries = {this.state.map} noteId ={this.state.idNote} />
     </Route>
     <Route path="/main">
                <Icons></Icons>
                <UserGeneralInformation/>
            </Route>

     </div>
  );
   }
}




export default Main;
