import React,{Component} from "react";
import {Redirect} from 'react-dom'
import '../../App.css';
import Header from "../../sidebarComponents/SidebarHeader";
import"../../sidebarComponents/SideBar.css";
import NewNoteMain from "./NewNoteMain";
import FooterSubmit from '../../sidebarComponents/FooterSubmit'


class NewNote extends Component{
render(){
return(
 <aside className="rightbar whole-comp ">
<Header title = "New Note" countryName={this.props.countryName}/>
<NewNoteMain countryName={this.props.countryName} idCountry={this.props.id} worldSeries = {this.props.worldSeries } />
<FooterSubmit text ="Add note" for="addNote"/>
</aside>
);
    }
}

export default NewNote;