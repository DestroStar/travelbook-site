import React from "react";
import './App.css';
import"./sidebarComponents/SideBar.css";
import './notesComponents/AllNotesPage.css';
import isAuthorized from './checker/authorizationChecker'
import UnAuthorizedNotes from './notesComponents/UnAuthorizedNotes.js';
import AuthorizedNotes from './notesComponents/AuthorizedNotes.js'
import Header from './sidebarComponents/SidebarHeader.js';


function Notes(props){
    return(
       !isAuthorized()?
        <aside className="rightbar whole-comp-no-footer ">
        <Header title = "Notes" countryName={props.name}/>
    <UnAuthorizedNotes />
</aside>
:
<aside className="rightbar whole-comp ">
<Header title = "Notes" countryName={props.name}/>
<AuthorizedNotes worldSeries={props.worldSeries} id= {props.id} setId={props.setId}/>

</aside>
                                         
         )
    }

export default Notes;

