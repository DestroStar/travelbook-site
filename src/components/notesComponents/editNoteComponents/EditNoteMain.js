import React, {Component} from 'react';
import '../NoteStyling.css'
import '../newNoteComponents/NewNote.css'
import City from '../../sidebarComponents/CityProperty'
import '../../App.css';
import "../../sidebarComponents/SideBar.css";
import PhotoUploader from '../newNoteComponents/PhotoUploading.js';
import EditEstimations from './EditEstimations.js';
import axios from 'axios';
import * as actions from '../../../actions/notesActions'
import CityForNote from "../../sidebarComponents/CityForNote";
import {getJwt} from "../../../helpers/jwt";

class EditNoteMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            isPublic: false,
            description: '',
            dateOfVisiting: '',
            login: localStorage.getItem('login'),
            describedCity: '',
            photoLink: [],
        };
        this.sendEditedNote = this.sendEditedNote.bind(this);
        this.getDate = this.getDate.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.setPhotos = this.setPhotos.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.setPrices = this.setPrices.bind(this);
        this.setPeople = this.setPeople.bind(this);
        this.setCuisine = this.setCuisine.bind(this);
        this.setImpression = this.setImpression.bind(this);
        this.setCity = this.setCity.bind(this);
    }

    onChangeName(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            dateOfVisiting: e.target.value
        });

    }

    onChangeDescription(e) {
        console.log("chnge");
        this.setState({
                description: e.target.value
            }
        );
    }

    sendEditedNote(e) {
        const token = getJwt();
        this.setConstantPhotos();
        console.log(this.state.photoLink);
        e.preventDefault();
        const endpoint = `http://localhost:8080/notes/${this.props.noteId}`;
        console.log(endpoint);
        // axios.put(endpoint, {
        //
        //     // photoLink: this.state.photoLink,
        // }, {
        // headers: {
        //     Authorization: token
        // }
        axios.put(endpoint, this.state, {
            headers: {
                Authorization: token
            }
        }).then(response => {
            window.location.href = '/notes';
            console.log("edited");
        });
    }

    setPhotos(files) {
        const url = 'http://localhost:8080/uploadFile';
        const formData = new FormData();
        formData.append('file', files[0]);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(url, formData, config)
            .then(response => {
                const generatedLink = response.data;
                console.log("generatedLink - " + generatedLink);
            });
    }

    setConstantPhotos() {

        this.setState({
            photoLink: ['https://storage.googleapis.com/travelbook/2jCyerz6API.jpg', 'https://storage.googleapis.com/travelbook/yhJYRnkALho.jpg']
        });

    }

    setCuisine(e) {
        this.setState({cuisineEstimate: e});
    }

    setPrices(e) {
        this.setState({pricesEstimate: e});
    }

    setImpression(e) {
        this.setState({commonImpression: e});
    }

    setPeople(e) {
        this.setState({
            peopleEstimate: e
        });
    }

    setCity(value) {
        this.setState({
            describedCity: value
        });
    }

    componentDidMount() {

        // const endpoint = `http://localhost:8080/country/notes/${this.props.noteId}`;
        // console.log(endpoint);
        // axios.get(endpoint)
        //     .then(response => {
        //         const note = response.data;
        //         this.setState({note})
        //     });
    }

    getDate() {
        if (this.state.dateOfVisiting) {
            let str = this.state.dateOfVisiting;
            console.log(str.slice(0, 10));
            return str.slice(0, 10);
        }
    }

    onCheck(e) {
        if (e.target.checked) {
            console.log("checked");
            this.setState({isPublic: true})
        } else {
            console.log("not checked");
            this.setState({isPublic: false})
        }
    }

    render() {

        return (
            <form name="editNote" id="editNote" className="main-sidebar  main-comp-newnote"
                  onSubmit={this.sendEditedNote}>
                <div className="name-field ">
                    <label htmlFor="name-note">Name of the note</label><input name="name-note" value={this.state.title}
                                                                              type="text" onInput={() => {
                }} onChange={this.onChangeName}/>
                </div>
                <CityForNote select_class="city-select" style_class="city-field" countryName={this.props.countryName}
                             setCity={this.setCity}/>
                <div className="date-field ">
                    <label for="date-note">Date</label><input type="date" onChange={this.onChangeDate} name="date-note"
                                                              className="date-in"/>
                </div>
                <div className="ddescription">
                    <p className="header-text">Description</p>
                    <textarea name="description" value={this.state.description} onChange={this.onChangeDescription}/>
                </div>
                <PhotoUploader setPhotos={this.setPhotos}/>
                <EditEstimations people={this.state.peopleEstimate} prices={this.state.pricesEstimate}
                                 cuisine={this.state.cuisineEstimate} impression={this.state.commonImpression}
                                 setPeople={this.setPeople}
                                 setPrices={this.setPrices} setImpression={this.setImpression}
                                 setCuisine={this.setCuisine}/>
                <div className="public-checkbox ">
                    <input name="isPublic" onClick={e => this.onCheck(e)} type="checkbox" value={this.state.isPublic}/>
                    <label htmlFor="name-note">public</label>
                </div>

            </form>
        );
    }
}

export default EditNoteMain;

