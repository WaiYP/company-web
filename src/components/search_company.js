import React,{Component} from 'react';

class SearchCompany extends Component{
   
    render() {
        const  srchcomp = this.props.searchedcompany;        
        
        return(
            <React.Fragment>
                { srchcomp ? (
                    <div>
                        <h3>Seacrhed Company</h3>
                        <h3>{srchcomp.name}</h3>
                        <p>{srchcomp.address}</p>
                    </div>
                ) : null }
                
            </React.Fragment>
        )
    
    }
    
                 
    
        
}

export default SearchCompany;