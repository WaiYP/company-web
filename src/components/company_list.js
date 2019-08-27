import React,{Component} from 'react';

class CompanyList extends Component{
    
    state ={marked:false}
   
    markClicked = evt => {
        this.setState ({marked: !this.state.marked})
        console.log (this.state.marked);
        fetch(`${process.env.REACT_APP_API_URL}/api/companies/${this.props.comany.id}/fav_company/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.state.token}`
            },
            body: JSON.stringify({mark:this.state.marked})
            }).then( resp => resp.json())
            .then( res => console.log(res))
            .catch( error => console.log(error))
    }
    render () {

        return (
            <div>
                {this.props.companies.map( company => {
                    return (                    
                            
                            <div key={company.id} className="company_item">                            
                                <h3>{company.name}</h3> <p>{company.address}</p>
                                {/* <input type="checkbox"   defaultChecked={this.state.marked}/>  */}
                                <input type="checkbox" defaultChecked={this.marked}/>                        
                            </div>
                            
                        
                    )
                })}
                
            </div>
        )
    }
    
        
}

export default CompanyList;