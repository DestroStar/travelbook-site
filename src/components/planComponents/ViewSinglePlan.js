import React, {Component} from "react";
import '../App.css';
// import './AllPlansPage.css'
import './PlansStyling.css'
import "../sidebarComponents/SideBar.css";
import * as moment from 'moment';
import CreateFooterForPlan from "./CreateFooterForPlan";
import {Redirect} from "react-router";
import axios from 'axios';
import Header from "../sidebarComponents/SidebarHeader";

class ViewSinglePlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: this.props.countryName,
            userLoginCreator: '',
            linkToUserAvatar: '',
            isPublic: false,
            title: '',
            date: '',
            nameCityToGo: '',
            nameCityFrom: '',
            budgetMin: '',
            budgetMax: '',
            transportType: '',
            amountOfPeople: '',
            description: ''
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/country/plans/${this.props.planId}`)
            .then(res => {
                this.setState({
                    userLoginCreator: res.data.userLoginCreator,
                    linkToUserAvatar: res.data.linkToUserAvatar,
                    isPublic: res.data.isPublic,
                    title: res.data.title,
                    date: moment(res.data.date).format('YYYY-MM-DD'),
                    nameCityToGo: res.data.nameCityToGo,
                    nameCityFrom: res.data.nameCityFrom,
                    budgetMin: res.data.budgetMin,
                    budgetMax: res.data.budgetMax,
                    transportType: res.data.transportType,
                    amountOfPeople: res.data.amountOfPeople,
                    description: res.data.description,
                });
            })
            .catch(error => {
                console.log(error);
                return <Redirect to="/errorPage"/>
            })
    }

    dateFormat() {
        const date = this.state.date;
        return moment(date).format( 'LL')
    }

    render() {
        return (
            <aside className="rightbar whole-comp ">
                <Header title = "View Plan" countryName={this.props.countryName}/>
            <div className='list-el-container list-plan-el'>
                <div className="owner-list-plans plan-owner-gen">
                    <div><img src={this.state.linkToUserAvatar} alt={""} className="account-image"/></div>
                    <div className="account-label">{this.state.userLoginCreator}</div>
                </div>
                <div className={"propertyTitle  prop"}>
                    <div>Title </div>
                    <textarea value={this.state.title} className="" readOnly/>
                </div>
                <div className={"propertyDate  prop"}>
                    <div>Date </div>
                    <textarea value= {this.dateFormat()} className="" readOnly/>
                </div>
                <div className={"propertyCityFrom  prop"}>
                    <div>City from </div>
                    <textarea value={this.state.nameCityFrom} className="" readOnly/>
                </div>
                <div className={"propertyCityTo  prop"}>
                    <div>City To </div>
                    <textarea value={this.state.nameCityToGo} className="" readOnly/>
                </div>
                <div className={"propertyBudgetMin  prop"}>
                    <div>BudgetMin </div>
                    <textarea value={this.state.budgetMin} className="" readOnly/>
                </div>
                <div className={"propertyBudgetMax  prop"}>
                    <div>BudgetMax </div>
                    <textarea value={this.state.budgetMax} className="" readOnly/>
                </div>
                <div className={"propertyTransport  prop"}>
                    <div>Transport </div>
                    <textarea value={this.state.transportType} className="" readOnly/>
                </div>
                <div className={"propertyAmount  prop"}>
                    <div>Amount of people </div>
                    <textarea value={this.state.amountOfPeople} className="" readOnly/>
                </div>
                <div className="description">
                    <div>{this.state.description}</div>
                </div>
                <CreateFooterForPlan userLoginCreator = {this.state.userLoginCreator} id = {this.props.planId}/>
            </div>
            </aside>
        )
    }
}
export default ViewSinglePlan;
