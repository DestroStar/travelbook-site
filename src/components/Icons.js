import React from 'react';
import {NavLink} from 'react-router-dom';
import './App.css';
import VisitedCountryCheckBox from './VisitedCountryCheckBox.js';


export default class Icons extends React.Component {

    constructor(props){
        super();
        this.state={
            countryName:'',
            id: '',
            worldSeries: ''
        }
    }

    componentWillReceiveProps(newProps){
        this.setState(()=>{return{id: newProps.id, countryName: newProps.countryName, worldSeries: newProps.worldSeries.state.polygonSeries}});
    }
    render(){
    return (
        <div className="icons header-row d-flex justify-content-end justify-content-lg-end col-lg-6 col-12">
            
            <VisitedCountryCheckBox countryName={this.state.countryName} id={this.state.id}
                                            worldSeries={this.state.worldSeries}/>
            <div className="icon-comp2 ">
                <NavLink to="/notes">
                    <button className="icon-button2 icons-button"></button>
                </NavLink>
            </div>
            <div className="icon-comp3 ">
                <NavLink to="/plans">
                    <button className="icon-button3 icons-button"></button>
                </NavLink>
            </div>
            <div className="icon-comp1 ">
                <NavLink to="/generalInfo">
                    <button className="icon-button1 icons-button"></button>
                </NavLink>
            </div>
            <div className="icon-comp4">
                <NavLink to="/gallery">
                    <button className="icon-button4 icons-button"></button>
                </NavLink>
            </div>
            <div className="icon-comp5">
                <NavLink to="/rating">
                    <button className="icon-button5 icons-button"></button>
                </NavLink>
            </div>
        </div>
    );
}
}

