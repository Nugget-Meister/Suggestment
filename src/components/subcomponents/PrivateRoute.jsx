import React, { useEffect } from 'react';
import { Route} from 'react-router';
import Redirect from '../Redirect/Redirect';
import { verifyToken } from './apicalls';

const PrivateRoute = (props) => {
    // console.log("private")

    const sessionToken = window.localStorage.getItem('sessionToken')

    useEffect(() => {
        verifyToken(sessionToken)
        .then(res => {
        if(res.message == "OK" && res != false){
            // console.log('success')
            window.localStorage.setItem('valid', true)
        } else {
            // console.log('bad')
            window.localStorage.setItem('valid', false)
        }
        })
    },[sessionToken])

    let auth = window.localStorage.getItem('valid')
    // console.log(auth == 'false')


    return (
        <>
            {auth == 'false' ? 
                <Redirect to='/signin'/>
                : props.element
            }
        </>
    );
}

export default PrivateRoute;
