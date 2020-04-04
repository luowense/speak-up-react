import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {

    if (localStorage.getItem('token')) {
        return <Route {...props} />
    } else {
        return <Redirect to='/admin' />
    }

}

export default PrivateRoute


//NE PAS ENLEVER POUR L'INSTANT!!!

// const PublicRoute = (MonComp)=>{
//   const isLogged = useContext(user)
//   if(isLogged)
//     return MonComp
//   else
//     return <Redirect to="/login" />
// }