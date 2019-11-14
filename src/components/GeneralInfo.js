import React, {Component} from "react";
import './App.css';
import axios from 'axios';
import {Route, NavLink, Redirect} from 'react-router-dom';
import Loading from "./Loading";



class GeneralInfo extends Component {

    constructor(props) {
        super();
        this.state = {
            generalInfo: [{}],
            description: [{}],
            weather: [{}],
            photos: [{}],
            isInfoValid: false,
            isLoading: true
        };
    }

    checkInfoValid(generalInfo) {

        if(generalInfo.description === undefined || generalInfo.name === "undefined"){
            this.setState({isInfoValid: false});
            return false;
        }else{
            this.setState({isInfoValid: true});
            return true;
        }
    }

    componentDidMount() {

        const endpoint = `http://localhost:8080/country/` + localStorage.country + `/description`;
        console.log(endpoint);
        const isLoading =false;
        axios.get(endpoint)
            .then(response => {
                const generalInfo = response.data;
                if(this.checkInfoValid(generalInfo)){
                const description = response.data.description;
                const weather = response.data.weather;
                const photos = response.data.photos;
                this.setState({generalInfo});
                this.setState({description});
                this.setState({weather});
                this.setState({photos});
                }
                this.setState({isLoading});

            }).catch(error => {
            console.log("Could not get GI from backend");
            this.setState({
                    isInfoValid: false
            });
            if(this.description === undefined){
            this.setState({isInfoValid: false});

            }
            
        });
    };

    


    render() {
        const spinner = this.state.isLoading ? <Loading/> : null;
        if (this.state.isInfoValid) {
                return (
                    <aside className="rightbar container" style={{overflow: 'auto'}}>
                        <h1>General Information about country</h1>
                        <p>Country name - {this.state.generalInfo.name}</p>
                        <p>Capital - {this.state.description.capital} </p>
                        <p className="weather">Current weather in capital {this.state.weather.temperature}, {" "}
                            {this.state.weather.description}
                        </p>
                        <p>Description - {this.state.description.commonInformation}</p>
                        <p>Cuisine - {this.state.description.cuisine}</p>
                        <p>Climate - {this.state.description.climate}</p>
                        {this.state.photos ? <p>{this.state.photos.map((value, index) =>
                            <img src={value.link} alt={"No image"} className="photo" key={index}/>
                        )}</p> : <p></p>}
                    </aside>
                );
            }
            else if(this.state.isLoading) {
                return (
                    <aside className="rightbar container" style={{overflow: 'auto'}}>
                        <h1>General Information about country</h1>
                        <Loading/> 
                    </aside>
                );
            } else{
                return (
                    <aside className="rightbar container" style={{overflow: 'auto'}}>
                        <h1>General Information about country</h1>
                        <p>no info</p>
                    </aside>
                );
            }
    }
}

export default GeneralInfo;
