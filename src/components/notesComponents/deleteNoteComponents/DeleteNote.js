import React, {Component} from "react";
import '../../App.css';
import Header from "../../sidebarComponents/SidebarHeader";
import "../../sidebarComponents/SideBar.css";
import FooterSubmit from "../../sidebarComponents/FooterSubmit";
import DeleteNoteMain from "./DeleteNoteMain";

function DeleteNote(props) {

    return (
        <aside className="rightbar whole-comp ">
            <Header title="Delete Note" countryName={props.countryName}/>
            <DeleteNoteMain countryName={props.countryName} noteId={props.noteId}/>
            <FooterSubmit text="delete note" path="notes" for="deleteNote"/>
        </aside>
    );
}

export default DeleteNote;