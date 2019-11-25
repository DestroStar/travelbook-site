import React, {Component} from "react";
import '../App.css';
import './NewPlan.css';
import "../sidebarComponents/SideBar.css";
import Header from "../sidebarComponents/SidebarHeader";
import FooterSubmit from '../sidebarComponents/FooterSubmit';
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import {Redirect} from "react-router";
import {getJwt} from "../../helpers/jwt";

/**
 *
 * @author Zhelezniak Dmytro
 */

class NewPlan extends Component{
    constructor(props){
        super(props);
        this.state = {
            country: this.props.countryName,
            cities: [],
            citiesTo: [],
            transports: [],
            userLoginCreator: localStorage.getItem('login'),
            linkToUserAvatar: localStorage.getItem('avatar'),
            isPublic: false,
            title: '',
            date: '',
            nameCityToGo: '',
            nameCityFrom: 'Kyiv',
            budgetMin: '',
            budgetMax: '',
            transportType: 'Plane',
            amountOfPeople: '',
            description: ''
        };
        this.sendNewPlan = this.sendNewPlan.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        this.setState({[e.target.name]: e.target.value})
    }

    sendNewPlan(e) {
        e.preventDefault();
        let token = getJwt();
        axios.post('http://localhost:8080/plans', this.state, {
            headers: {
                Authorization: token
            }
        });
        this.props.worldSeries.getPolygonById(this.props.id).fill = am4core.color("#7c467f");
        this.setState({onSubmit: true})
    }

    onCheck(e){
        if(e.target.checked){
            this.setState({isPublic:true})
        }else{
            this.setState({isPublic:false})
        }
    }

    componentDidMount() {
        let token = getJwt();
        axios.get('http://localhost:8080/transport', {
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                this.setState({transports: res.data});
            }).catch(error => {
            console.log(error);
            return <Redirect to="errorPage"/>
        });
        axios.get('http://localhost:8080/cities')
            .then(res => {
                this.setState({cities: res.data});
            }).catch(error => {
                console.log(error);
                return <Redirect to={"errorPage"}/>
        });
        axios.get(`http://localhost:8080/country/${this.state.country}/cities`)
            .then(res => {
                this.setState({citiesTo: res.data});
            }).catch(error => {
                console.log(error);
                return <Redirect to={"errorPage"}/>
        })
    }

    getAllCities() {
        let options = [];
        for (let i = 0; i < this.state.cities.length; i++){
            options.push(<option value={this.state.cities[i].name}> {`${this.state.cities[i].name}`}</option>)
        }
        return options;
    };

    getCountryCities() {
        let options = [];
        for (let i = 0; i < this.state.citiesTo.length; i++){
            options.push(<option value={this.state.citiesTo[i].name}> {`${this.state.citiesTo[i].name}`}</option>)
        }
        return options;
    };

    getTransport() {
        let options = [];
        for (let i = 0; i < this.state.transports.length; i++) {
            options.push(<option value={this.state.transports[i].type}> {`${this.state.transports[i].type}`}</option>)
        }
        return options;
    };


    render(){
        if(this.state.onSubmit){
            return <Redirect to="travelbook"/>
        }
        return(
            <aside className="rightbar whole-comp ">
                <Header title = "New Plan" countryName={this.props.countryName}/>
                <form name="addPlan" id="addPlan" className="main-sidebar  main-comp-newplan"
                      onSubmit={this.sendNewPlan}>
                    <div className="title-field prop-plan">
                        <div>Title </div>
                        <input className= "input-plan" type = "text" onChange={this.handleChange} name = "title" value={this.state.title}/>
                    </div>
                    <div className="date-field-plan prop-plan">
                        <div>Date</div>
                        <input type="date" onChange={this.handleChange} name="date" className="date-in" value={this.state.date} required/>
                    </div>
                    <div className="city-field-from prop-plan">
                        <div>City from </div>
                        <select className="city-select" name="nameCityFrom" value = {this.state.nameCityFrom} onChange={this.handleChange}>
                            {this.getAllCities()}
                        </select>
                    </div>
                    <div className="city-field-to prop-plan">
                        <div>City to </div>
                        <select className="city-select" name="nameCityToGo" value = {this.state.nameCityToGo} onChange={this.handleChange}>
                            {this.getCountryCities()}
                        </select>
                    </div>
                    <div className="budgetMin-field prop-plan">
                        <div>Budget min</div>
                        <input className= "input-plan" type = "text" onChange={this.handleChange} name ="budgetMin" value={this.state.budgetMin}/>
                    </div>
                    <div className="budgetMax-field prop-plan">
                        <div>Budget Max</div>
                        <input className= "input-plan" type = "text" onChange={this.handleChange} name="budgetMax" value={this.state.budgetMax}/>
                    </div>
                    <div className="transport-field prop-plan">
                        <div>Transport </div>
                        <select className="transport-select" name="transportType" value={this.state.transportType} onChange={this.handleChange}>
                            {this.getTransport()}
                        </select>
                    </div>
                    <div className="amount-field prop-plan">
                        <div>Amount of people</div>
                        <input className= "input-plan" type = "text" onChange={this.handleChange} name="amountOfPeople" value={this.state.amountOfPeople}/>
                    </div>
                    <div className="description-newplan">
                        <p className="header-text">Description</p>
                        <textarea placeholder="what do you want" onChange={this.handleChange} name="description" value={this.state.description}/>
                    </div>
                    <div className="public-checkbox ">
                        <input name="isPublic" onClick={e => this.onCheck(e)} type="checkbox"/> <label
                        htmlFor="name-plan">public</label>
                    </div>
                </form>
                <div className ="create-plan-button">
                    <input type='submit' className="create-plan-button submitButton" form ="addPlan" value="Add Plan"/>
                </div>
            </aside>
        );
    }
}

export default NewPlan;
