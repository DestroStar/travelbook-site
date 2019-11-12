import React, {Component} from 'react';
import Header from "../header";
import SearchPlans from "./SearchPlans";

class SearchMain extends Component {
    render() {
        return (
            <div>
                <Header/>
                <SearchPlans/>
            </div>
        );
    }
}

export default SearchMain;