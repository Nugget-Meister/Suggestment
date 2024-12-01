import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Redirect = () => {
    let navigate = useNavigate()

    useEffect(()=>{
        navigate('/')
    }, [])
    return (
        <div>
            lemon
        </div>
    );
}

export default Redirect;
