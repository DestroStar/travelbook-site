import React from 'react'
import './App.css';
import {NavLink} from "react-router-dom";

function UnSettings(props) {
    return (
        <div className="settings">
            <div className="authorize1 header-text">
                <NavLink to="/login">Log In</NavLink>
            </div>
            <div className="authorize2 header-text">
                <NavLink to="/registration">Registration
                </NavLink>
            </div>
        </div>
    )
}


export default UnSettings;