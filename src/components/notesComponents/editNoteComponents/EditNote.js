import React,{Component} from "react";
import '../../App.css';
import Header from "../../sidebarComponents/SidebarHeader";
import"../../sidebarComponents/SideBar.css";
import EditNoteMain from "./EditNoteMain.js";
import * as actions from '../../../actions/notesActions'
import FooterSubmit from "../../sidebarComponents/FooterSubmit";

function EditNote(props){
 
return(
     <aside className="rightbar whole-comp ">
<Header title = "Edit Note" countryName={props.countryName}/>
<EditNoteMain />
<FooterSubmit text ="edit note" path="notes" for="editNote"/>
</aside>
);
    }
export default EditNote;