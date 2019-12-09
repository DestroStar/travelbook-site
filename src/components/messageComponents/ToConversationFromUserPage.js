import {Link, NavLink, Redirect} from 'react-router-dom';
import '../sidebarComponents/SideBar.css'
import '../App.css';
import React, {Component} from 'react';
import "./Messages.css"


class ToConversationFromUserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.setIntercolutor = this.setIntercolutor.bind(this);
    }

    setIntercolutor(e) {
        e.preventDefault();
        console.log(this.props.login);
        localStorage.setItem('intercolutor', this.props.login);
        this.setState({redirect: true});
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/conversation'/>;
        }
        return (
                <Link className="link-to-chat" to="/conversation"
                      onClick={this.setIntercolutor}>
                    <button className='btn btn-outline-primary'>Send message</button>
                </Link>
        )
    }
}

export default ToConversationFromUserPage;
