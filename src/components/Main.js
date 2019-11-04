import React, {useState} from 'react';
import {Route,} from 'react-router-dom';
import './App.css';
import SideBar from "./sidebar.js";
import Head from "./header.js";
import Map from "./Map.js";
import Notes from "./Notes.js";
import Plans from "./Plans.js";
import Gallery from "./Gallery.js";
import Icons from './Icons';
import GeneralInfo from "./GeneralInfo";
import UserMap from "./UserMap";
import UserNoteById from "./UserNoteById";


function Main(props) {
    const [state, setState] = useState({});


    function regionClicker(ev, worldSeries) {
        console.log(ev.target.dataItem.dataContext);
        setState({
            nameCountry: ev.target.dataItem.dataContext.name,
            idCountry: ev.target.dataItem.dataContext.id,
            map: worldSeries
        })
    }

    return (
        <div className={props.gridClass}>
            <Head/>
            <Map clicker={regionClicker}/>
            <Route path="/travelbook">
            </Route>
            <Route path="/notes">
                <Icons></Icons>
                {/*<Notes name={state.nameCountry} id={state.idCountry} worldSeries={state.map}/>*/}
                <UserNoteById name={state.nameCountry}/>
            </Route>
            <Route path="/gallery">
                <Icons></Icons>
                <Gallery name={state.nameCountry}/>
            </Route>
            <Route path="/plans">
                <Icons></Icons>
                <Plans name={state.nameCountry} id={state.idCountry} worldSeries={state.map}/>
            </Route>
            <Route path="/generalInfo">
                <Icons></Icons>
                <GeneralInfo name={state.nameCountry}/>
            </Route>
            <Route path="/users">
                <Icons></Icons>
                <UserMap name={state.nameCountry} worldSeries={state.map}/>
            </Route>
        </div>
    );
}


export default Main;
