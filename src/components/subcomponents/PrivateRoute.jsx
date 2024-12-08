import React, { useEffect } from 'react';
import { Route} from 'react-router';
import Redirect from '../Redirect/Redirect';

const PrivateRoute = (props) => {
    console.log("private")
   let auth = window.localStorage.getItem('valid')
    // useEffect(()=> {
    //     console.log("hit")
    // })


    return (
        <>
            {!auth ? 
                <Redirect to='/signin'/>
                : props.element
            }
        </>
    );
}

export default PrivateRoute;
