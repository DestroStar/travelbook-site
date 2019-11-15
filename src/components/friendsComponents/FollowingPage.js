import React, {Component} from 'react';
import {getJwt} from "../../helpers/jwt";
import axios from 'axios';
import OneFollowing from "./OneFollowing";
import FriendsHeader from "./FriendsHeader";

/**
 *
 * @author Zhelezniak Dmytro
 */

class FollowingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            followings: [],
        }
        this.getFollowings = this.getFollowings.bind(this);
    }

    getFollowings() {
        let friends = [];
        this.state.followings.forEach(e => friends.push(<OneFollowing login = {e.login} avatar = {e.avatar}/>));
        return friends;
    }

    componentDidMount() {
        let token = getJwt();

        axios.get(`http://localhost:8080/users/following?user=${localStorage.getItem('login')}`,{
            headers: {
                Authorization: token
            }
        }).then(res => {
            this.setState({followings : res.data});
            console.log(res.data);
        });
    }

    render() {
        return(
            <aside className="rightbar container">
                <FriendsHeader/>
                <aside className="following">
                    {this.getFollowings()}
                </aside>
            </aside>
        )
    }
}

export default FollowingPage;
