import React, {Component} from "react";
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import showUserMap from './userMap/UserMapShower'
import isAutorized from './checker/authorizationChecker.js'

class Map extends Component {
    constructor() {
        super();
        this.state = {
            properLink: '/travelbook',
            chart: '',
            polygonSeries: ''
        }
    }

    changeState = () => {
        this.setState({properLink: '/travelbook'});
    }

    zoomToObject(id) {
        this.state.chart.zoomToMapObject(this.state.polygonSeries.getPolygonById(id));
    }

    componentDidMount() {
        let chart = am4core.create("chartdiv", am4maps.MapChart);
        this.setState({chart});
        chart.geodata = am4geodata_worldLow;
        chart.projection = new am4maps.projections.Miller();

        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        this.setState({polygonSeries});
        polygonSeries.exclude = ["AQ"];
        polygonSeries.useGeodata = true;

        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color('rgb(204, 204, 204)');
        polygonTemplate.nonScalingStroke = true;

        polygonTemplate.events.on('hit', (e) => {
            console.log(e.target);
            this.props.clicker(e, polygonSeries)
            this.setState({
                properLink: '/generalInfo'
            })
            this.zoomToObject('UA'
            );
            e.target.series.chart.zoomToMapObject(e.target);
        });

        if (isAutorized()) {
            showUserMap(polygonSeries);
        }

    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <main className="mainPage ">
                <Link to={this.state.properLink}>
                    <div className="chartdiv" onClick={this.changeState}></div>
                </Link>
            </main>

        )

    }

}

export default Map;