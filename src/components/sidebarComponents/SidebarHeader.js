import React from 'react';
import '../notesComponents/NoteStyling.css'
import '../App.css';
function SidebarHeader(props){
    return (
       <React.Fragment>
<div className ="note-title container header-text">{props.title}</div>
<div className ="note-country container header-text">{props.countryName}</div>
</React.Fragment>
    );
}
export default SidebarHeader;