import React from 'react';
import '../notesComponents/NoteStyling.css'
import '../sidebarComponents/SideBar.css'
import '../App.css';
function SideBarFooter(props){
    return (
  <div className ="sidebar-footer main-container header-text">
      <NavLink className="nav-link header-text" to ={props.path}>
                    {props.text}
                              </NavLink>
                              </div>

    );
}
export default SideBarFooter;
