import React, {Component} from 'react';
import '../NoteStyling.css'
import '../newNoteComponents/NewNote.css'
import '../../App.css';
import "../../sidebarComponents/SideBar.css";
import axios from 'axios';
import * as actions from '../../../actions/notesActions'
import {deleteNoteById} from "../../../actions/notesActions";
import {Redirect} from 'react-router-dom';
import NoteListElement from "../allNotes/NoteListElement";
import {getJwt} from "../../../helpers/jwt";
import {getLogin} from "../../../helpers/getLogin";
import NoteListElementReadOnly from "../allNotes/NoteListElementReadOnly";
import Loading from "../../Loading";

class DeleteNoteMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: [{}],
            country: localStorage.getItem('country'),
            isLoading: true
        };
        this.deleteNote = this.deleteNote.bind(this);
    }

    deleteNote(e) {
        e.preventDefault();
        const token = getJwt();

        const deleteNoteEndpoint = `http://localhost:8080/notes/${this.props.noteId}`;
        axios.delete(deleteNoteEndpoint, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                console.log("note deleted");
                window.location.href = '/notes';
            })
            .catch(error => {
                console.log(error);
                window.location.href = '/errorPage';
            });

        if (localStorage.getItem('userNotesAmount') == 1) {
            const login = getLogin();
            const deleteRelationshipEndpoint = `http://localhost:8080/country/${this.state.country}/notvisit?user=${login}`;
            console.log(deleteRelationshipEndpoint);
            axios.post(deleteRelationshipEndpoint, {
                headers: {
                    Authorization: token
                }
            }).then(response => {
                window.location.href = '/notes';
                console.log("link user-country deleted");
            })
                .catch(error => {
                    window.location.href = '/errorPage';
                    console.log(error);
                });
        }
        else {
            window.location.href = '/notes';
        }

    }

    getNoteEntityById(noteId) {
        const isLoading = false;
        const endpoint = `http://localhost:8080/country/notes/${noteId}`;
        axios.get(endpoint)
            .then(response => {
                const note = response.data;
                this.setState({note});
                this.setState({isLoading});
            });
    }

    componentDidMount() {
        this.getNoteEntityById(this.props.noteId);
        console.log(this.state.note);
    }

    render() {
        const spinner = this.state.isLoading ? <Loading/> : null;
        if (this.state.isLoading) {
            return (
                <div className="loading-center">
                    {spinner}
                </div>
            )
        }
        else {
            return (
                <form name="deleteNote" id="deleteNote" className="main-sidebar  main-comp-newnote"
                      onSubmit={this.deleteNote}>
                    <div className="name-field">
                        Are you sure you want to delete this note?
                        <NoteListElementReadOnly note={this.state.note}/>
                    </div>
                </form>
            );
        }
    }

}

export default DeleteNoteMain;

