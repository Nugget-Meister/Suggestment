import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getSignInVerification } from '../subcomponents/apicalls';

const VerifySignIn = () => {

    let token = useParams().token
    let navigate = useNavigate()
    useEffect(()=> {
        getSignInVerification(token)
        .then((res)=> {
            if(res.message == "OK"){
                window.localStorage.setItem('sessionToken', res.data)
                navigate('/')
            }
        })
    }, [])

    return (
        <div>
            
        </div>
    );
}

export default VerifySignIn;
