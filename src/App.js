import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Main from './components/Main.js';


class App extends Component{

   render(){
  return (
  
    <Router baseName="/travelbook/">
      <Switch>
      <Route path="/generalInfo/">
        <Main gridClass="grid-cont"/>
        </Route>
        <Route path="/notes/">
        <Main gridClass="grid-cont"/>
        </Route>
        <Route path="/gallery/">
        <Main gridClass="grid-cont"/>
        </Route>
        <Route path="/plans/">
        <Main gridClass="grid-cont"/>
        </Route>
        <Route path="/note/">
        <Main gridClass="grid-cont"/>
        </Route>
        <Route path="/newnote/">
        <Main gridClass="grid-cont"/>
        </Route>
        <Route path="/travelbook/">
        <Main gridClass="grid-cont-initially"/>
      </Route>
      <Route path="/errorPage/">
        <h1>Error</h1>
      </Route>
      <Route>
        <h1>Not Found</h1>
      </Route>
      </Switch>
      </Router>
    
  );
   }
}

export default App;
