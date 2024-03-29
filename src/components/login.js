import React,{ Component } from 'react';
import { withCookies } from 'react-cookie';

class Login extends Component {

    state = {
        credentials:{
            username:'',
            password:''
        },
        
    }
    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }
    login = event => {   
        fetch(`${process.env.REACT_APP_API_URL}/gettoken/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
            }).then( resp => resp.json())
            .then( res => {
                console.log(res.token);
                this.props.cookies.set('mr-token', res.token);
                window.location.href = "/companies";
            })
            .catch( error => console.log(error))     
        
        console.log(this.state.credentials);
    }
    
    render () {

        return <div className="login-container">
            <h1>Login</h1>
            <span>Username</span><br/>
            <input type="text" name="username" value={this.state.credentials.username} onChange={this.inputChanged}/><br/>
            <span>Password</span><br/>
            <input type="password" name ="password" value={this.state.credentials.password} onChange = {this.inputChanged}  /><br/>
            <button onClick={this.login}>Login</button>
        </div>
    }
}

export default withCookies(Login);