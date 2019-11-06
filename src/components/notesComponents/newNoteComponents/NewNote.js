import React from "react";
import '../../App.css';
import Header from "../../sidebarComponents/SidebarHeader";
import"../../sidebarComponents/SideBar.css";
import NewNoteMain from "./NewNoteMain";
import FooterSubmit from '../../sidebarComponents/FooterSubmit'


function NewNote(props){
 
return(
 <aside className="rightbar whole-comp ">
<Header title = "New Note" countryName={props.countryName}/>
<NewNoteMain countryName={props.countryName} idCountry={props.id} worldSeries = {props.worldSeries } />
<FooterSubmit text ="Add note" for="addNote"/>
</aside>
);
    }

export default NewNote;