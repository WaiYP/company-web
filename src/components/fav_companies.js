import React , {Component} from 'react';

class FavCompanies extends Component{
    
    

    render () {
        // console.log (this.props.favouritecompanies) 
        return (
            <div>            
                <h3>Favourite Companies</h3>
                    {/* { this.props.favouritecompanies.map ( favcompany => {
                        return (<div key={favcompany.id} >
                            <h3>{favcompany.name}</h3>
                        </div>)
                    })} */}
 
            </div>
        )
    }
}

export default FavCompanies;