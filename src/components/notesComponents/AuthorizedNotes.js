import React,{Component} from "react";
import '../App.css';
import NotesWrapper from "./NotesWrapper.js";
import OnlyMyNotes from "./OnlyMyNotes";
import ToAddFooter from "../sidebarComponents/ToAddFooter.js";
import './AllNotesPage.css';
import axios from 'axios';


class AuthNotes extends Component{
   constructor(props){
      super(props);
      this.state = {
          notes:[],
          checked:false
         
      }
      this.onCheck = this.onCheck.bind(this);
      this.loadAll = this.loadAll.bind(this);
      this.loadOnlyUsers = this.loadOnlyUsers.bind(this);
  }
  onCheck(e){
     if(e.target.checked)
     {
        console.log("checked");
        this.setState({checked:true});
        this.loadOnlyUsers();
     }else{
        console.log("not checked");
      this.setState({checked:false});
      this.loadAll();
     }
  }
  loadAll(){
   axios.get(`http://localhost:8080/country/${this.props.countryName}/notes/${'login'}`).then(res=>{
      console.log(res.data);
   this.setState({...this.state,notes:res.data.notes})
   })
  }
  loadOnlyUsers(){
   axios.get(`http://localhost:8080/country/${this.props.countryName}/notes/private/${'login'}`).then(res=>{
      console.log(res.data);
   this.setState({...this.state,notes:res.data.notes})
   })
  }
  componentDidMount(){
    this.loadAll();
  }
      render(){
             return(
       <React.Fragment>
             <div className="list-main-auth main-sidebar " >
            <OnlyMyNotes funCheck={this.onCheck} />
          <NotesWrapper classWr={"allNotes container"} setId={this.props.setId} countryName={this.props.countryName}/>
             </div>   
             <ToAddFooter text="add note" path="newnote"/>
             </React.Fragment>
                )
      }
}

export default AuthNotes;