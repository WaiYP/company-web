import React, {Component} from 'react';
import './App.css';
import CompanyList from './components/company_list';
import FavCompanies from './components/fav_companies';
import ResetPassword from './components/reset_password';
import SearchCompany from './components/search_company';
import { withCookies } from 'react-cookie';

class App extends Component {

  state = {
    companies: [],
    newpassword : null,
    btnclick : null,
    searchedname : null,
    searchedcompany : null,
    favouritecompanies: [],
    loaded:true,
    token: this.props.cookies.get('mr-token')
  }
  inputChanged = event => {
    this.setState({searchedname: event.target.value});
    console.log(event.target.value);
  }

  favClicked = () =>  {
    this.setState({btnclick:1})
    fetch(`${process.env.REACT_APP_API_URL}/api/companies/favourite_list/`, {
      method: 'GET',
      headers: {
          'Authorization': `Token ${this.state.token}`
      },
      }).then( resp => resp.json())
      .then( res => this.setState({favouritecompanies:res}))
      .catch( error => console.log(error))
  }

  searchClicked = (searchedname)  => evt => {
    this.setState({loaded:0});
    fetch(`${process.env.REACT_APP_API_URL}/api/companies/search_by_name/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.state.token}`
      },
      body: JSON.stringify({name:searchedname})
      }).then( resp => resp.json())
      .then( res => this.setState({searchedcompany:res}))
      .catch( error => console.log(error))
  }
  componentDidMount(){
    if (this.state.token){
      fetch('http://127.0.0.1:8000/api/companies/',{
      method:'GET',
      headers:{
        'Authorization':`Token ${this.state.token}`
      }      
    }).then(resp => resp.json())
    .then(res => this.setState({companies:res}))
    .catch(error => console.log(error))
    }
    else{
      window.location.href = '/';
    }
    
  }
  resetPassword = () => {
    this.setState({btnclick:0})
    //this.setState({btnclick: {password:'', conf_password:''}});
  } 
  savePassword = password => {
    this.setState ({newpassword:password});
  }
   
  // companyClicked = company => {
  //   console.log(company);
  // } companyClicked={this.companyClicked}

  render () {
    return (
      <div className="App">        
          
          <h1>Company List</h1>          
          
          <div className="layout"> 
            <div>
              <input type="text" placeholder="Company Name" onChange={this.inputChanged}/> 
              <button onClick={this.searchClicked(this.state.searchedname)}>Search</button>         
              {this.state.loaded ? <CompanyList companies={this.state.companies} />  : <SearchCompany searchedcompany={this.state.searchedcompany}/> }
            </div>
            <div>  
              
              { this.state.btnclick ?
                <FavCompanies favouritecompanies={this.state.favouritecompanies}/> 
              : <ResetPassword resetPassword={this.savePassword} token={this.state.token}/>
               }              
              
            </div>
          </div>
          <div className="btn-container">
            <div>
              <button onClick={this.favClicked} >Favourite Companies</button>
            
              <button onClick={this.resetPassword} >Reset Password</button>
            </div>
          </div>
      </div>
    );
  }
  
}

export default withCookies(App);
