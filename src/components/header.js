import React, {Component} from "react";
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import Search from './Search.js'
import './App.css';
import Settings from "./Settings.js";
import Dropdown from '../components/userMenu/Dropdown'
import DropdownItem from '../components/userMenu/DropdownItem'
class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <header className="row header-row">
                <NavLink to="/travelbook" className="col-lg-2 col-sm-12 d-flex justify-content-center justify-content-lg-start" style={{minWidth: 150+"px"}}>
                <div className="title">TravelBook</div>
                </NavLink>
                <Search setMap={this.props.setMap}/>
                <Settings/>
              
            </header>
            </div>
        )
    }
}

export default Header;