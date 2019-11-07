import React, {Component} from "react";
import './App.css';
import axios from 'axios';
import {Route, NavLink, Redirect} from 'react-router-dom';
import showUserMap from './userMap/UserMapShower'

class GeneralInfo extends Component {

    constructor(props) {
        super();
        this.state = {
            generalInfo: [{}],
            description: [{}],
            weather: [{}]
        };
        this.getGeneralInfo = this.getGeneralInfo.bind(this);
    }

    componentDidMount() {
        this.getGeneralInfo();
        showUserMap(this.props.worldSeries);
    };

    componentWillReceiveProps() {
        this.getGeneralInfo();
    }

    getGeneralInfo() {
        const endpoint = `http://localhost:8080/country/` + this.props.name + `/description`;
        console.log(endpoint);
        axios.get(endpoint)
            .then(response => {
                const generalInfo = response.data;
                const description = response.data.description;
                const weather = response.data.weather;
                this.setState({generalInfo});
                this.setState({description});
                this.setState({weather});
                console.log(generalInfo);
            });
    }

    render() {
        if(this.state.description !== undefined && this.state.weather !== undefined && this.state.generalInfo !== undefined){ //todo refactor
        return (
            <aside className="rightbar container" style={{overflow: 'auto'}}>
                
                <h1>General Information about country</h1>
                <p>Country name - {this.state.generalInfo.name}</p>
                <p>Capital - {this.state.description.capital} </p>
                <p>Current weather in capital - {this.state.weather.temperature}, {" "}
                    {this.state.weather.description}
                </p>
                <p>Description - {this.state.description.commonInformation}</p>
                <p>Cuisine - {this.state.description.cuisine}</p>
                <p>Climate - {this.state.description.climate}</p>
                
            </aside>
        )
    } else
    {
        return (
            <aside className="rightbar container" style={{overflow: 'auto'}}>
                </aside>
        );
    }
}
}

export default GeneralInfo;
