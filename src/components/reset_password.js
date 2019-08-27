import React,{Component} from 'react';

class ResetPassword extends Component {
    
    render(){
        return (
            <div className="right-container" >
                <h3>Reset Password</h3>
                <span>Password</span>
                <input type="text" name='password' /><br/>
                    
                <span>Confirm Password</span>
                <input type="text" name="conf_password"/><br/>
                <button>Reset</button>
            </div>
        )
    }
}

export default ResetPassword;